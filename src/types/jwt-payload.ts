export interface IJWTPayload{
    user_id: string;
    username: string;
    role: UserRole;
}

export enum UserRole{
    ADMIN = 1,
    USER = 2
}