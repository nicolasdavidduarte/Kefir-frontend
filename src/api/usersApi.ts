import { apiFetch } from "./http"
import type { User } from "../types/User"

export function getUsers(): Promise<User[]> {
    return apiFetch<User[]>("/api/users")
}