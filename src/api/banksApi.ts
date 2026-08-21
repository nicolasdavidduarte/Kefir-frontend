import { apiFetch } from "./http"
import type {Bank} from "../types/Bank.ts";

const bankPath = "/banks";

export function fetchBanks(): Promise<Bank[]> {
    return apiFetch<Bank[]>(bankPath)
}