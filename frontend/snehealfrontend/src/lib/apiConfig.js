const DEFAULT_API_URL = 'https://sneheal-app-production.up.railway.app';

export function getApiBaseUrl() {
  return (
    process.env.REACT_APP_API_URL ||
    process.env.VITE_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_API_URL
  ).replace(/\/$/, '');
}
