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