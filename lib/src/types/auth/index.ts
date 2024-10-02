import { UserDTO } from "../user"

export interface LoginDTO {
    username: string
    password: string
}


export interface RegisterDTO extends Omit<UserDTO, 'id'> {
    username: string
    password: string
}

export interface AuthPayload {
    accessToken: string,
    refreshToken: string
}