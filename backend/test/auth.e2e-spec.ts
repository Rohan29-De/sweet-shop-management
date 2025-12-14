import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

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
        await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
        await app.close();
    });

    it('/api/auth/register (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
            })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('message', 'User registered successfully');
                expect(res.body).toHaveProperty('userId');
            });
    });

    it('/api/auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('access_token');
                expect(res.body).toHaveProperty('user');
            });
    });
});
