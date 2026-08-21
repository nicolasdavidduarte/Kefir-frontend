import { apiFetch } from "./http"
import type { Currency } from "../types/Currency.ts";

const currencyPath = "/currencies";

export function fetchCurrencies(): Promise<Currency[]> {
    return apiFetch<Currency[]>(currencyPath)
}