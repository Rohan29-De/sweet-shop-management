import { PrismaService } from '../prisma/prisma.service';
import { CreateSweetDto, UpdateSweetDto } from './dto/sweets.dto';
export declare class SweetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSweetDto): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }[]>;
    search(query: string): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }[]>;
    findByCategory(category: string): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateSweetDto): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
    purchase(id: string): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
    restock(id: string, quantity: number): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string | null;
        createdAt: Date;
    }>;
}
