export class RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserRequest {
    name: string
    password: string
}

export class UserResponse {
    name: string;
    email: string;
    token?: string
}