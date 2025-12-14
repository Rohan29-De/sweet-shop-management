import { IsString, IsNotEmpty, IsNumber, Min, IsEnum, IsOptional, IsUrl } from 'class-validator';

export class CreateSweetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}

export class UpdateSweetDto {
    @IsString()
    name?: string;
    @IsString()
    category?: string;
    @IsNumber()
    price?: number;
    @IsNumber()
    quantity?: number;
    @IsOptional()
    @IsString()
    imageUrl?: string;
}
