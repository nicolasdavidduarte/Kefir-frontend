import { apiFetch } from "./http.ts"
import type { User, UserRequest } from "../types/User.ts"

const usersPath = "/users"

export function fetchUsers(): Promise<User[]> {
    return apiFetch<User[]>(usersPath)
}

export function createUser(user: UserRequest): Promise<User> {
    return apiFetch<User>(usersPath, {
        method: "POST",
        body: JSON.stringify(user)
    })
}

export function updateUserStatus(id: number, enabled: boolean): Promise<User> {
    return apiFetch<User>(`${usersPath}/${id}/status`, {
        method: "POST",
        body: JSON.stringify({ enabled })
    })
}