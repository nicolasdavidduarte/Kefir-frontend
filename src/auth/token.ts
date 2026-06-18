const TOKEN_KEY = "accessToken"
const USER = "user"

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function setUser(user: string){
    localStorage.setItem(USER, user)
}

export function getUser() : string | null {
    return localStorage.getItem(USER)
}

export function removeUser(){
    localStorage.removeItem(USER)
}

function decodePayload(token: string): any {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decodificando el payload del JWT:", error);
        return null;
    }
}

export function isTokenExpired(): boolean {
    const token = getToken();
    if (!token) return true;

    const payload = decodePayload(token);
    if (!payload || !payload.exp) return true;

    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expirationTime;
}

export function getTokenRemainingTime(): number {
    const token = getToken();
    if (!token) return 0;

    const payload = decodePayload(token);
    if (!payload || !payload.exp) return 0;

    const expirationTime = payload.exp * 1000;
    const remaining = expirationTime - Date.now();

    return remaining > 0 ? remaining : 0;
}