import { apiFetch } from "./http"
import type {LoanInstallment, LoanInstallmentPaymentRequest} from "../types/LoanInstallment.ts"

export function fetchLoanInstallments(loanId: number): Promise<LoanInstallment[]> {
    return apiFetch<LoanInstallment[]>(`/loans/${loanId}/installments`)
}

export function createInstallmentPayment(loanId: number, installmentNumber: number, loanInstallmentPaymentRequest: LoanInstallmentPaymentRequest): Promise<LoanInstallment> {
    return apiFetch<LoanInstallment>(`/loans/${loanId}/installments/${installmentNumber}/payment` , {
        method: "POST",
        body: JSON.stringify(loanInstallmentPaymentRequest)
    })
}