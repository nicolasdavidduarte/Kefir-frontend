import {setToken, setUser} from "../auth/token"
import type { AuthResponse } from "../types/AuthResponse"

export async function login(
    username: string,
    password: string
): Promise<AuthResponse> {

    const response = await fetch("/api/auth/login", {
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