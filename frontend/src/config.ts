// Central API configuration.
// VITE_API_URL in .env should be set to your machine's local network IP (e.g. http://10.x.x.x:5000)
// so that both desktop and mobile devices on the same Wi-Fi can reach the backend.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
