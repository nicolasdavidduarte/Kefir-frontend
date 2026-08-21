import { apiFetch } from "./http"
import type { Version } from "../types/Version.ts";

const versionPath = "/version";

export function fetchVersion(): Promise<Version> {
    return apiFetch<Version>(versionPath)
}