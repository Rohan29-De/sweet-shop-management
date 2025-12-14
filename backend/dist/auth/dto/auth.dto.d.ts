export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class RegisterDto {
    email: string;
    password: string;
    role?: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
