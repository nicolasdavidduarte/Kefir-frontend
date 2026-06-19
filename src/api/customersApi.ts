import { apiFetch } from "./http"
import type { Customer } from "../types/Customer"

export function fetchCustomers(): Promise<Customer[]> {
    return apiFetch<Customer[]>("/api/customers")
}