// Central API configuration.
// Default production backend falls back to Render host: https://values-vruksha-backend.onrender.com
export const API_URL = import.meta.env.VITE_API_URL || 'https://values-vruksha-backend.onrender.com';

interface ExtendedRequestInit extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

/**
 * Custom fetch wrapper that provides:
 * 1. Automatic base URL resolution (prepends API_URL if a relative path is passed).
 * 2. Protocol upgrade (forces HTTPS for non-localhost production endpoints).
 * 3. Automatic retries with exponential backoff (e.g. for handling Render cold starts or network errors).
 * 4. Cache-busting query parameter for GET requests to guarantee up-to-date data.
 */
export const apiFetch = async (
  input: string,
  init: ExtendedRequestInit = {}
): Promise<Response> => {
  const maxRetries = init.retries ?? 8; // 8 retries is optimal for Render cold starts (~50-60 seconds total window)
  const initialDelay = init.retryDelay ?? 2000; // start with 2s

  // 1. Resolve relative URLs to absolute backend URLs
  let url = input;
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    const cleanBase = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const cleanPath = input.startsWith('/') ? input : `/${input}`;
    url = `${cleanBase}${cleanPath}`;
  }

  // 2. Force HTTPS for all production (non-localhost) domains
  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    url = url.replace(/^http:\/\//i, 'https://');
  }

  // 3. Cache-busting for GET requests to always fetch latest images/data
  const method = (init.method || 'GET').toUpperCase();
  if (method === 'GET') {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}_t=${Date.now()}`;
  }

  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, init);

      // Retry on Server Errors (5xx), which is common during Render cold starts (502 Bad Gateway / 503 Service Unavailable / 504 Gateway Timeout)
      if (res.status >= 500 && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(1.5, attempt);
        console.warn(
          `[API Warning] Request to ${url} returned status ${res.status}. (Render cold start or temporary failure). Retrying in ${Math.round(delay)}ms... (Attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      return res;
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = initialDelay * Math.pow(1.5, attempt);
        console.warn(
          `[API Warning] Request to ${url} failed: ${err.message || err}. Retrying in ${Math.round(delay)}ms... (Attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  console.error(`[API Error] Request to ${url} failed permanently after ${maxRetries} retries.`);
  throw lastError || new Error(`Failed to fetch from ${url} after ${maxRetries} attempts.`);
};

