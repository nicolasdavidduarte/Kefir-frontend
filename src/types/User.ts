export type User = {
    id: number
    username: string
    enabled: boolean
    createdAt: string
    roles: string[]
}

export type UserRequest = {
    username: string
    fullname: string
    password: string
    roles: string[]
}