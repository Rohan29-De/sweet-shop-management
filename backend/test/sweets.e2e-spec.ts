import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { UserRole } from '../src/auth/dto/auth.dto';

describe('SweetsController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let adminToken: string;
    let userToken: string;
    let sweetId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        app.setGlobalPrefix('api');
        await app.init();
        prisma = app.get<PrismaService>(PrismaService);

        // Cleanup
        await prisma.sweet.deleteMany();
        await prisma.user.deleteMany();

        // Create Admin
        await request(app.getHttpServer())
            .post('/api/auth/register')
            .send({ email: 'admin@test.com', password: 'password', role: UserRole.ADMIN });
        const adminLogin = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({ email: 'admin@test.com', password: 'password' });
        adminToken = adminLogin.body.access_token;

        // Create User
        await request(app.getHttpServer())
            .post('/api/auth/register')
            .send({ email: 'user@test.com', password: 'password', role: UserRole.USER });
        const userLogin = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({ email: 'user@test.com', password: 'password' });
        userToken = userLogin.body.access_token;
    });

    afterAll(async () => {
        await prisma.sweet.deleteMany();
        await prisma.user.deleteMany();
        await app.close();
    });

    it('/api/sweets (POST) - Admin can create sweet', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/sweets')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Ladoo', category: 'Indian', price: 10, quantity: 5 })
            .expect(201);
        sweetId = res.body.id;
        expect(res.body.name).toBe('Ladoo');
    });

    it('/api/sweets/:id/purchase (POST) - User can purchase', async () => {
        await request(app.getHttpServer())
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(201);

        const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });
        expect(sweet.quantity).toBe(4);
    });

    it('/api/sweets/:id/restock (POST) - Admin can restock', async () => {
        await request(app.getHttpServer())
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ quantity: 10 })
            .expect(201);

        const sweet = await prisma.sweet.findUnique({ where: { id: sweetId } });
        expect(sweet.quantity).toBe(14);
    });
});
