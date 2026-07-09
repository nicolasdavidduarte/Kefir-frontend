export type LoanInstallment = {
    loanId: number
    number: number
    principalAmount: number
    interestAmount: number
    totalAmount: number
    paymentDueDate: string
    remainingBalance: number
    status: string
    user: string
    createdAt: string
    updatedAt: string
}