import { apiFetch } from "./http"
import type { CustomerType } from "../types/CustomerType.ts";

const customerTypePath = "/customerTypes";

export function fetchCustomerTypes(): Promise<CustomerType[]> {
    return apiFetch<CustomerType[]>(customerTypePath)
}