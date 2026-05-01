// localStorage-backed edit store for editable text & image positions.
// Image binary payloads live in IndexedDB (see imageStore.js); the
// localStorage entry holds a sentinel string. Export/Import here knows how
// to inline the IDB data so the JSON file is a *complete* portable snapshot
// of every edit (text + images), letting the user move work between domains
// (e.g. localhost ↔ Vercel) where browser storage is otherwise scoped.

import { imgGet, imgPut, imgDelete, imgClear, IDB_MARKER } from './imageStore';

const STORAGE_KEY = 'visionoid_credential_edits_v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// One-shot migration: on the very first load with this build, purge
// every storage entry related to P02's image wraps. Reason: a non-trivial
// number of installs are showing the original unsplash sample images in
// P02 even though the bundle has none — meaning the user's localStorage
// or IDB still references them from a prior session, and bake() injects
// them on every page load. The flag prevents re-firing so any image
// uploads after this migration are preserved.
const P02_RESET_FLAG = 'visionoid_p02_oneshot_reset_v1';
function applyP02OneShotReset() {
  try {
    if (localStorage.getItem(P02_RESET_FLAG) === '1') return;
  } catch { return; }
  let raw = {};
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch {}
  const removed = [];
  // Known textbox ids on P02 that wrap the editable image cards. If any of
  // these have a saved text edit, the saved innerHTML almost certainly
  // contains a stale <img src="https://images.unsplash.com/..."> and will
  // re-poison the page on every reload. Nuke them here.
  const P02_POISONED_TEXTBOX_IDS = ['fabric-obj-6-1775605004066'];
  for (const k of Object.keys(raw)) {
    const isImgKey = k.startsWith('p2:img:') || k.startsWith('p2:imgxform:') || k.startsWith('p2:imgfit:');
    const isPoisonedText = P02_POISONED_TEXTBOX_IDS.some((tid) =>
      k === `p2:text:${tid}` || k === `p2:ja:text:${tid}` || k === `p2:en:text:${tid}`
    );
    if (isImgKey || isPoisonedText) {
      removed.push(k);
      delete raw[k];
    }
  }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(raw)); } catch {}
  // Wipe the IDB entries that backed those `:img:` markers via the proper
  // imageStore API (which knows how to upgrade-create the object store).
  // CRITICAL: we previously called indexedDB.open() directly here without
  // an onupgradeneeded handler, which silently created the database with
  // NO object store on first run. Subsequent imgPut calls then threw
  // "object stores was not found" inside persistImage's try/catch, so
  // uploads never made it to IDB and disappeared on reload. Routing
  // through imgDelete fixes that.
  Promise.all(
    removed.filter((k) => k.startsWith('p2:img:')).map((k) =>
      imgDelete(k).catch((e) => console.warn('[VN p02-reset] imgDelete failed', k, e))
    )
  ).catch(() => {});
  try { localStorage.setItem(P02_RESET_FLAG, '1'); } catch {}
  // eslint-disable-next-line no-console
  console.log(`[VN p02-reset] one-shot wiped ${removed.length} P02 image entries:`, removed);
}
applyP02OneShotReset();

const cache = load();

export function useEditStore() {
  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
      save(cache);
    },
    remove: (key) => {
      delete cache[key];
      save(cache);
    },
    all: () => ({ ...cache }),
    reset: () => {
      for (const k of Object.keys(cache)) delete cache[k];
      save(cache);
      imgClear().catch(() => {});
    },
  };
}

// Surgical reset: clears the image edits for a single page AND any text
// edits on textboxes whose innerHTML contains image wraps (those are the
// poison source — saved unsplash <img> tags re-injected on every reload).
// Other pages' images and clean text edits stay intact.
const POISONED_TEXTBOX_IDS_BY_PAGE = {
  2: ['fabric-obj-6-1775605004066'],
};
export async function resetPageImages(pageId) {
  const prefixes = [
    `p${pageId}:img:`,
    `p${pageId}:imgxform:`,
    `p${pageId}:imgfit:`,
  ];
  const poisonedTextIds = POISONED_TEXTBOX_IDS_BY_PAGE[pageId] || [];
  const poisonedTextKeys = new Set();
  for (const tid of poisonedTextIds) {
    poisonedTextKeys.add(`p${pageId}:text:${tid}`);
    poisonedTextKeys.add(`p${pageId}:ja:text:${tid}`);
    poisonedTextKeys.add(`p${pageId}:en:text:${tid}`);
  }
  const removed = [];
  for (const k of Object.keys(cache)) {
    if (prefixes.some((p) => k.startsWith(p)) || poisonedTextKeys.has(k)) {
      removed.push(k);
      delete cache[k];
    }
  }
  save(cache);
  await Promise.all(
    removed
      .filter((k) => k.startsWith(`p${pageId}:img:`))
      .map((k) => imgDelete(k).catch(() => {}))
  );
  return removed;
}

// Export a portable JSON snapshot. Resolves IndexedDB-backed image data URLs
// inline so the file contains everything needed to reproduce the edits in
// another browser/domain.
export async function exportEdits() {
  const edits = load();
  const out = { ...edits };
  const idbKeys = Object.keys(edits).filter((k) => edits[k] === IDB_MARKER);
  await Promise.all(idbKeys.map(async (k) => {
    try {
      const dataUrl = await imgGet(k);
      if (dataUrl) out[k] = dataUrl;
    } catch (e) {
      // Leave the marker if fetch fails — partial export is better than none.
      console.warn('exportEdits: imgGet failed for', k, e);
    }
  }));
  return JSON.stringify(out, null, 2);
}

// Import a snapshot. Any value that looks like a data URL (large image) is
// pushed back to IndexedDB and the localStorage entry becomes the IDB marker.
// Plain string edits (text overrides, image URLs, transforms) are stored
// directly in localStorage.
export async function importEdits(json) {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    return false;
  }
  if (!parsed || typeof parsed !== 'object') return false;

  const next = {};
  const idbWrites = [];
  for (const k of Object.keys(parsed)) {
    const v = parsed[k];
    if (typeof v === 'string' && v.startsWith('data:')) {
      // Embedded image payload → write to IDB, store sentinel.
      idbWrites.push(imgPut(k, v).catch((e) => {
        console.warn('importEdits: imgPut failed for', k, e);
      }));
      next[k] = IDB_MARKER;
    } else {
      next[k] = v;
    }
  }
  await Promise.all(idbWrites);

  save(next);
  // Refresh in-memory cache so live components see the new edits without reload.
  for (const k of Object.keys(cache)) delete cache[k];
  Object.assign(cache, next);
  return true;
}
