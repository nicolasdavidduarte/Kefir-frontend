import { setToken, setUser } from "../auth/token"
import type { AuthResponse } from "../types/AuthResponse"

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const BASE_URL = `${API_BASE}/api`;

export async function login(
    username: string,
    password: string
): Promise<AuthResponse> {

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        throw new Error("Invalid credentials")
    }

    const data: AuthResponse = await response.json()

    setToken(data.accessToken)
    setUser(username)

    return data
}