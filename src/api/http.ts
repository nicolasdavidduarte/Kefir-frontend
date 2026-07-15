import { getToken } from "../auth/token"

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const BASE_URL = `${API_BASE}/api`;

export interface BackendErrorPayload {
    message: string | Record<string, string>;
    status: number;
    timestamp: string;
}

export class ApiError extends Error {
    status: number;
    payload: BackendErrorPayload | null;

    constructor(message: string, status: number, payload: BackendErrorPayload | null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.payload = payload;
    }
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {

    const token = getToken()

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    })

    if (!response.ok) {
        let errorMessage = `HTTP error ${response.status}`
        let errorData: BackendErrorPayload | null = null

        try {
            errorData = await response.json() as BackendErrorPayload;
            if (errorData && typeof errorData.message === "string") {
                errorMessage = errorData.message;
            }
        } catch (parseError) {
            console.error("Failed to parse error response body:", parseError);
        }

        throw new ApiError(errorMessage, response.status, errorData);
    }

    return response.json()
}