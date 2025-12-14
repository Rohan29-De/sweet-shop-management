"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SweetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SweetsService = class SweetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.sweet.create({ data: dto });
    }
    async findAll() {
        return this.prisma.sweet.findMany();
    }
    async search(query) {
        return this.prisma.sweet.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { category: { contains: query } },
                ],
            },
        });
    }
    async findByCategory(category) {
        return this.prisma.sweet.findMany({
            where: {
                category: category,
            },
        });
    }
    async findOne(id) {
        const sweet = await this.prisma.sweet.findUnique({ where: { id } });
        if (!sweet)
            throw new common_1.NotFoundException('Sweet not found');
        return sweet;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.sweet.update({ where: { id }, data: dto });
    }
    async purchase(id) {
        return this.prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({ where: { id } });
            if (!sweet)
                throw new common_1.NotFoundException('Sweet not found');
            if (sweet.quantity <= 0) {
                throw new common_1.BadRequestException('Out of stock');
            }
            return tx.sweet.update({
                where: { id },
                data: { quantity: sweet.quantity - 1 },
            });
        });
    }
    async restock(id, quantity) {
        if (quantity <= 0) {
            throw new common_1.BadRequestException('Restock quantity must be positive');
        }
        return this.prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({ where: { id } });
            if (!sweet)
                throw new common_1.NotFoundException('Sweet not found');
            return tx.sweet.update({
                where: { id },
                data: { quantity: sweet.quantity + quantity },
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.sweet.delete({ where: { id } });
    }
};
exports.SweetsService = SweetsService;
exports.SweetsService = SweetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SweetsService);
//# sourceMappingURL=sweets.service.js.map