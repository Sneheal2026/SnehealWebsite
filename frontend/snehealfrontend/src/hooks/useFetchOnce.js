import { useEffect, useState } from 'react';
import { ApiError } from '../lib/apiClient';

/**
 * Fetch data once per mount; relies on GET dedupe for Strict Mode duplicate effects.
 */
export function useFetchOnce(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError('');
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load data.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls refetch keys via deps
  }, deps);

  return { data, loading, error, setData };
}
