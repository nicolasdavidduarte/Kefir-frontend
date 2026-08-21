import { apiFetch } from "./http"
import type { LoanType } from "../types/LoanType.ts";

const loanTypesPath = "/loans/types";

export function fetchLoanTypes(): Promise<LoanType[]> {
    return apiFetch<LoanType[]>(loanTypesPath)
}