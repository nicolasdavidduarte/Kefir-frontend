export type LoanInstallment = {
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