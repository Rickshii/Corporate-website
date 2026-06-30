// Central configuration for frontend API routing.
// Dynamically resolves local network IP so mobile devices on the same Wi-Fi can fetch media/API data.
export const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  if (typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'localhost') {
    try {
      const url = new URL(envUrl);
      url.hostname = window.location.hostname;
      return url.origin;
    } catch (e) {
      // Fallback fallback if url parsing fails
      return envUrl.replace('localhost', window.location.hostname);
    }
  }
  
  return envUrl;
};

export const API_URL = getApiUrl();
