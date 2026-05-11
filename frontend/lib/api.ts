import { env } from '@/config/env';

interface FetchOptions extends RequestInit {
  data?: any;
  token?: string;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { data, token, headers: customHeaders, ...customOptions } = options;

  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...customOptions,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = 'An error occurred with the API request.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function uploadFileApi<T>(endpoint: string, formData: FormData, token?: string): Promise<T> {
  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    // Note: Do not set Content-Type to multipart/form-data manually,
    // fetch will automatically set it with the correct boundary when body is FormData
  };

  const config: RequestInit = {
    method: 'POST',
    body: formData,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = 'An error occurred during file upload.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
