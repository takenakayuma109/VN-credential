// localStorage-backed edit store for editable text & image positions.
// Image binary payloads live in IndexedDB (see imageStore.js); the
// localStorage entry holds a sentinel string. Export/Import here knows how
// to inline the IDB data so the JSON file is a *complete* portable snapshot
// of every edit (text + images), letting the user move work between domains
// (e.g. localhost ↔ Vercel) where browser storage is otherwise scoped.

import { imgGet, imgPut, imgClear, IDB_MARKER } from './imageStore';

const STORAGE_KEY = 'visionoid_credential_edits_v1';
const MIGRATION_FLAG = 'visionoid_migration_killswitch_v1';

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

// One-time killswitch migration on boot: if not yet applied, wipe ALL image
// edits — both `p<n>:img:<key>` localStorage entries AND every entry in the
// IndexedDB `images` store. Reason: even after stripping unsplash URLs from
// the source HTML and adding string-match cleanups, users were still seeing
// the legacy sample photos on screen. The only remaining injection path is
// IDB-resident data: URLs (likely screenshots of the originals saved during
// earlier sessions, which our string match cannot detect since they're raw
// pixels). Nuking image storage once is destructive of any legitimate
// uploaded photos but is the only way to guarantee the samples never come
// back. The flag prevents this from re-firing and clobbering future uploads.
function applyKillswitchMigration(data) {
  try {
    if (localStorage.getItem(MIGRATION_FLAG) === '1') return data;
  } catch { return data; }

  let droppedKeys = 0;
  for (const k of Object.keys(data)) {
    if (!k.includes(':img:') && !k.includes(':imgxform:') && !k.includes(':imgfit:')) continue;
    delete data[k];
    droppedKeys++;
  }
  // Wipe IDB image store too. Fire-and-forget; the sentinel localStorage
  // entries are already gone so even if IDB clear races, bake() has nothing
  // to look up.
  imgClear().catch((e) => console.warn('[VN killswitch] imgClear failed', e));
  save(data);
  try { localStorage.setItem(MIGRATION_FLAG, '1'); } catch {}
  // eslint-disable-next-line no-console
  console.log(`[VN killswitch] wiped ${droppedKeys} image edits + IDB image store (one-time)`);
  return data;
}

const cache = applyKillswitchMigration(load());

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
    },
  };
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
