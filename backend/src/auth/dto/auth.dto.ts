import { IsEmail, IsString, IsNotEmpty, IsEnum, MinLength, IsOptional } from 'class-validator';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole; // Optional, defaults to USER in DB
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
