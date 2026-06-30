import { apiFetch } from "./http"
import type { Loan, LoanRequest } from "../types/Loan.ts"

const loanPath = "/api/loans";

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

export function chargeOffLoan(id: number): Promise<Loan> {
    return apiFetch<Loan>(`${loanPath}/${id}/close`, {
        method: "PATCH"
    });
}