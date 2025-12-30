const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  const headers = {
    "Content-Type": "application/json",
    ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),
    ...options.headers
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    let message = "API Error";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
};
