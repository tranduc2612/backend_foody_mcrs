export interface UserDTO {
    id: string,
    username: string
    email: string,
    token?: string,
    refreshToken?: string
}