import { apiFetch } from "./http"
import type { Customer, CustomerCreationRequest } from "../types/Customer"

const customerPath = "/customers";

export function fetchCustomers(): Promise<Customer[]> {
    return apiFetch<Customer[]>(customerPath)
}

export function fetchCustomersByNameOrDocument(customerQuery: string): Promise<Customer[]> {
    return apiFetch<Customer[]>(
        `${customerPath}/search/${encodeURIComponent(customerQuery)}`
    );
}

export function createCustomer(customerCreationRequest: CustomerCreationRequest): Promise<Customer>{
    return apiFetch<Customer>(customerPath , {
        method: "POST",
        body: JSON.stringify(customerCreationRequest)
    })
}

export function activateCustomer(id: number): Promise<Customer> {
    return apiFetch<Customer>(`${customerPath}/${id}/status/activate`, {
        method: "POST"
    });
}

export function deactivateCustomer(id: number): Promise<Customer> {
    return apiFetch<Customer>(`${customerPath}/${id}/status/deactivate`, {
        method: "POST"
    });
}