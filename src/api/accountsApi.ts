import { apiFetch } from "./http"
import type { Account } from "../types/Account"

export function fetchAccounts(): Promise<Account[]> {
    return apiFetch<Account[]>("/api/accounts")
}