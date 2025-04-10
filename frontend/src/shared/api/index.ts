const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_URL}${path}`;
  console.log('API fetch:', url, options);
  const res = await fetch(url, options);
  console.log('Response status:', res.status);
  return res;
}
