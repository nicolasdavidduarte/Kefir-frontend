export type Customer = {
    id: number
    name1: string
    name2: string
    name3: string
    lastname1: string
    lastname2: string
    lastname3: string
    fullname: string
    personType: string
    documentType: string
    documentNumber: string
    customerType: string
    status: string
    createdByUser: string
    creationDate: string
    updateDate: string
}

export type CustomerCreationRequest = {
    name1: string,
    name2: string,
    name3: string,
    lastname1: string,
    lastname2: string,
    lastname3: string,
    personType: string,
    documentType: string,
    documentNumber: string,
    customerType: string
}