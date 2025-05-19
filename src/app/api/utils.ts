import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API URL
export const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

// Create an axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add request interceptor for common handling
apiClient.interceptors.request.use(
  (config) => {
    // You could add authentication tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for common error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to make GET requests
export const apiGet = async <T>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, {
      params,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Format a URL with query parameters
export const formatUrl = (endpoint: string, params?: Record<string, string | number | boolean | undefined>): string => {
  if (!params) return endpoint;
  
  const url = new URL(endpoint, API_BASE_URL);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
};

// Format error messages for user display
export const formatErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return 'Resource not found. Please check your request and try again.';
    }
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      return 'You are not authorized to access this resource.';
    }
    
    if (error.response?.status && error.response.status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.message) {
      return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred. Please try again.';
}; 