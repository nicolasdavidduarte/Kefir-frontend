import { apiFetch } from "./http"
import type { Account } from "../types/Account"

const accountPath = "/api/accounts";

export function fetchAccounts(): Promise<Account[]> {
    return apiFetch<Account[]>(accountPath)
}

export function activateAccount(id: number): Promise<Account> {
    return apiFetch<Account>(`${accountPath}/${id}/open`, {
        method: "PATCH"
    });
}

export function deactivateAccount(id: number): Promise<Account> {
    return apiFetch<Account>(`${accountPath}/${id}/close`, {
        method: "PATCH"
    });
}