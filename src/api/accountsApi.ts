import { apiFetch } from "./http"
import type { Account, AccountRequest } from "../types/Account"

const accountPath = "/accounts";

export function fetchAccounts(): Promise<Account[]> {
    return apiFetch<Account[]>(accountPath)
}

export function fetchAccountsByCustomerId(customerId: number): Promise<Account[]> {
    return apiFetch<Account[]>(`${accountPath}?customerId=${customerId}`);
}

export function createAccount(accountRequest: AccountRequest): Promise<Account>{
    return apiFetch<Account>(accountPath , {
        method: "POST",
        body: JSON.stringify(accountRequest)
    })
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