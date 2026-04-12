import axios from 'axios';

const fallbackBaseUrl = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

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

axios.defaults.baseURL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export default axios;