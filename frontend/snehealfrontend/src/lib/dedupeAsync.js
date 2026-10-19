/** Coalesce concurrent async work with the same key (e.g. React Strict Mode double-mount). */
const inFlight = new Map();

export function dedupeAsync(key, fn) {
  const existing = inFlight.get(key);
  if (existing) {
    return existing;
  }

  const promise = Promise.resolve()
    .then(fn)
    .finally(() => {
      inFlight.delete(key);
    });

  inFlight.set(key, promise);
  return promise;
}
