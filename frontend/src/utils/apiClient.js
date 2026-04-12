import axios from 'axios';

const env = /** @type {{ DEV?: boolean, VITE_API_BASE_URL?: string }} */ (/** @type {any} */ (import.meta).env || {});

const fallbackBaseUrl = env.DEV
  ? 'http://localhost:5000/api'
  : 'https://visionaryai-b.onrender.com/api';

/** @param {string | undefined} value */
function normalizeApiBaseUrl(value) {
  const raw = typeof value === 'string' ? value.trim() : '';

  if (!raw) return fallbackBaseUrl;

  const withProtocolSlashes = raw.replace(/^(https?:)(?!\/\/)/, '$1//');
  const withoutTrailingSlash = withProtocolSlashes.replace(/\/+$/, '');

  if (withoutTrailingSlash.startsWith('/')) {
    return withoutTrailingSlash;
  }

  if (/\/api(?:\/|$)/i.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
}

axios.defaults.baseURL = normalizeApiBaseUrl(env.VITE_API_BASE_URL);

export default axios;