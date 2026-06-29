export type Loan = {
    id: number
    externalId: string
    customer: string
    loanType: string
    amortizationType: string
    currency: string
    numberOfInstallments: number
    annualInterestRate: number
    monthlyInterestRate: number
    totalPrincipal: string
    totalInterest: string
    totalOperationAmount: number
    openingDate: string
    expirationDate: string
    status: string
    createdAt: string
    user: string
}

export type LoanRequest = {
    customerId: number,
    loanType: string,
    amortizationType: string,
    principalAmount: number,
    currencyIsoCode: string,
    numberOfInstallments: number,
    externalId: number
}