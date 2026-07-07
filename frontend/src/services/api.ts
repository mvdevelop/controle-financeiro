import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as CustomAxiosRequestConfig;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    console.error('Não autenticado');
                }

                return Promise.reject(error);
            }
        );
    }

    public getApi() {
        return this.api;
    }
}

export const apiService = new ApiService();
export default apiService.getApi();
