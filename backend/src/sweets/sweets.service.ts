import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSweetDto, UpdateSweetDto } from './dto/sweets.dto';

@Injectable()
export class SweetsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSweetDto) {
        return this.prisma.sweet.create({ data: dto });
    }

    async findAll() {
        return this.prisma.sweet.findMany();
    }

    async search(query: string) {
        return this.prisma.sweet.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { category: { contains: query } },
                ],
            },
        });
    }

    async findByCategory(category: string) {
        return this.prisma.sweet.findMany({
            where: {
                category: category,
            },
        });
    }

    async findOne(id: string) {
        const sweet = await this.prisma.sweet.findUnique({ where: { id } });
        if (!sweet) throw new NotFoundException('Sweet not found');
        return sweet;
    }

    async update(id: string, dto: UpdateSweetDto) {
        await this.findOne(id); // Check existence
        return this.prisma.sweet.update({ where: { id }, data: dto });
    }

    async purchase(id: string) {
        return this.prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({ where: { id } });
            if (!sweet) throw new NotFoundException('Sweet not found');
            if (sweet.quantity <= 0) {
                throw new BadRequestException('Out of stock');
            }
            return tx.sweet.update({
                where: { id },
                data: { quantity: sweet.quantity - 1 },
            });
        });
    }

    async restock(id: string, quantity: number) {
        if (quantity <= 0) {
            throw new BadRequestException('Restock quantity must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({ where: { id } });
            if (!sweet) throw new NotFoundException('Sweet not found');
            return tx.sweet.update({
                where: { id },
                data: { quantity: sweet.quantity + quantity },
            });
        });
    }

    async remove(id: string) {
        await this.findOne(id); // Check existence
        return this.prisma.sweet.delete({ where: { id } });
    }
}
