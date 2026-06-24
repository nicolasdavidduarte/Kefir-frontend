import { getToken } from "../auth/token"

const BASE_URL = "http://localhost:8080"

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
            ...options.headers
        }
    })

    if (!response.ok) {
        let errorMessage = `HTTP error ${response.status}`

        try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
        } catch(parseError) {
            console.error("Failed to parse error response body:", parseError)
        }

        throw new Error(errorMessage)
    }

    return response.json()
}