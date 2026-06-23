import { apiFetch } from "./http"
import type { LoanInstallment } from "../types/LoanInstallment.ts"

export function fetchLoanInstallments(loanId: number): Promise<LoanInstallment[]> {
    return apiFetch<LoanInstallment[]>(`/api/loans/${loanId}/installments`)
}