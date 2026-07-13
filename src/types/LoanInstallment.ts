export type LoanInstallment = {
    loanId: number
    number: number
    principalAmount: number
    interestAmount: number
    totalAmount: number
    paymentDueDate: string
    remainingBalance: number
    installmentStatus: string
    loanStatus: string
    createdAt: string
    updatedAt: string
}