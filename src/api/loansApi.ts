import { apiFetch } from "./http"
import type { Loan, LoanRequest } from "../types/Loan.ts"

const loanPath = "/loans";

export function fetchLoans(): Promise<Loan[]> {
    return apiFetch<Loan[]>(loanPath)
}

export function createLoan(loanRequest: LoanRequest): Promise<Loan>{
    return apiFetch<Loan>(loanPath , {
        method: "POST",
        body: JSON.stringify(loanRequest)
    })
}

export function approveLoan(id: number): Promise<Loan> {
    return apiFetch<Loan>(`${loanPath}/${id}/approve`, {
        method: "PATCH"
    });
}

export function chargeOffLoan(id: number, reason: string): Promise<Loan> {
    return apiFetch<Loan>(`${loanPath}/${id}/chargeoff`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ reason })
    });
}