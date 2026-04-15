// Tiny localStorage-backed edit store for editable text & image positions.
// Single global key to make export/import easy.

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
    },
  };
}

export function exportEdits() {
  return JSON.stringify(load(), null, 2);
}

export function importEdits(json) {
  try {
    const parsed = JSON.parse(json);
    save(parsed);
    Object.assign(cache, parsed);
    return true;
  } catch {
    return false;
  }
}
