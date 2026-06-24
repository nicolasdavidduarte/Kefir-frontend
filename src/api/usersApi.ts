import { apiFetch } from "./http.ts"
import type { User, UserRequest } from "../types/User.ts"

export function fetchUsers(): Promise<User[]> {
    return apiFetch<User[]>("/api/users")
}

export function createUser(user: UserRequest): Promise<User> {
    return apiFetch<User>("/api/users", {
        method: "POST",
        body: JSON.stringify(user)
    })
}