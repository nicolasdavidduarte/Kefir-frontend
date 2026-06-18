import { apiFetch } from "./http"
import type { User } from "../types/User"

export function fetchUsers(): Promise<User[]> {
    return apiFetch<User[]>("/api/users")
}