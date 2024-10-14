export interface UserDTO {
    username: string;
    password?: string;
    email?: string;
    role?: string;
    DOB?: Date;
    avatar?: string;
    createdAt?: Date;
    token?: string,
    refreshToken?: string
}