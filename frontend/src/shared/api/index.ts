const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_URL}${path}`;
  
  // Получаем токен из localStorage
  const token = localStorage.getItem('authToken');
  
  // Создаем новый объект с опциями, чтобы не мутировать входящий параметр
  const updatedOptions: RequestInit = { ...options };
  
  // Инициализируем заголовки, если их нет
  if (!updatedOptions.headers) {
    updatedOptions.headers = {};
  }
  
  // Преобразуем заголовки в объект, если они в формате Headers
  const headers = updatedOptions.headers instanceof Headers 
    ? Object.fromEntries(updatedOptions.headers.entries()) 
    : { ...updatedOptions.headers as Record<string, string> };
  
  // Добавляем токен в заголовки, если он существует
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Обновляем заголовки в опциях
  updatedOptions.headers = headers;
  
  console.log('API fetch:', url, updatedOptions);
  const res = await fetch(url, updatedOptions);
  console.log('Response status:', res.status);
  return res;
}
