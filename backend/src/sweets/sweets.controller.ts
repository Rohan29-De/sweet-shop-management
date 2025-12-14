import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { CreateSweetDto, UpdateSweetDto } from './dto/sweets.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserRole } from '../auth/dto/auth.dto';

@Controller('sweets')
export class SweetsController {
    constructor(private readonly sweetsService: SweetsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createSweetDto: CreateSweetDto) {
        return this.sweetsService.create(createSweetDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.sweetsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('category/:category')
    findByCategory(@Param('category') category: string) {
        return this.sweetsService.findByCategory(category);
    }

    @UseGuards(JwtAuthGuard)
    @Get('search')
    search(@Query('q') query: string) {
        return this.sweetsService.search(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sweetsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSweetDto: UpdateSweetDto) {
        return this.sweetsService.update(id, updateSweetDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sweetsService.remove(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post(':id/purchase')
    purchase(@Param('id') id: string) {
        return this.sweetsService.purchase(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post(':id/restock')
    restock(@Param('id') id: string, @Body('quantity') quantity: number) {
        return this.sweetsService.restock(id, quantity);
    }
}
