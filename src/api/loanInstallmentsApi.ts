import { apiFetch } from "./http"
import type { LoanInstallment } from "../types/LoanInstallment.ts"

export function fetchLoanInstallments(loanId: number): Promise<LoanInstallment[]> {
    return apiFetch<LoanInstallment[]>(`/loans/${loanId}/installments`)
}

export function createInstallmentPayment(loanId: number, installmentNumber: number): Promise<LoanInstallment> {
    return apiFetch<LoanInstallment>(`/loans/${loanId}/installments/${installmentNumber}/payment` , {
        method: "POST"
    })
}