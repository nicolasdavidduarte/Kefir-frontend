import { apiFetch } from "./http"
import type { Loan } from "../types/Loan.ts"

export function fetchLoans(): Promise<Loan[]> {
    return apiFetch<Loan[]>("/api/loans")
}