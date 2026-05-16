const KEY     = 'contentforge_history';
const MAX_LEN = 20;

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveToHistory(entry) {
  const history = getHistory();
  const updated = [entry, ...history].slice(0, MAX_LEN);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  return [];
}
