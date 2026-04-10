
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '@clerk/clerk-react';

// Interface para o interceptor de autenticação
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

class ApiService {
    private api: AxiosInstance;
    private getToken?: () => Promise<string | null>;

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

    public setTokenGetter(getToken: () => Promise<string | null>) {
        this.getToken = getToken;
    }

    private setupInterceptors() {
        // Request interceptor para adicionar token
        this.api.interceptors.request.use(
            async (config: CustomAxiosRequestConfig) => {
                if (this.getToken) {
                    const token = await this.getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor para tratar erros
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as CustomAxiosRequestConfig;
                
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    // Aqui pode implementar refresh token se necessário
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
