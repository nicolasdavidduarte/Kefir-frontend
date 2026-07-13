export type Account = {
    id: number,
    customer: string,
    type: string,
    currencyIsoCode: string,
    bank: string,
    cbu: string,
    balance: number,
    status: string,
    createdBy: string,
    createdAt: string,
    updatedBy: string,
    updatedAt: string
}

export type AccountRequest = {
    type: string,
    customerId: number,
    currencyIsoCode: string,
    bankId: number,
    bankBranchId: number,
    initialBalance: number
}