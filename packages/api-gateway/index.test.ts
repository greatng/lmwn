import request from 'supertest';
import { app } from '.';

describe('api-gateway', () => {
    it('should return http 200 and API should return message properly', async () => {
        await request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual(
                    'LINE MAN Wongnai Frontend Assignment'
                );
            });
    });

    describe('endpoint readiness', () => {
        it('should return http 200 and API should return requested restaurant', async () => {
            await request(app)
                .get('/api/restaurants/227018')
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        name: 'Ekkamai Macchiato - Home Brewer',
                        id: '227018',
                        coverImage: expect.any(String),
                        menus: expect.any(Array<string>),
                        activeTimePeriod: {
                            open: expect.any(String),
                            close: expect.any(String),
                        },
                    });
                });
        });

        it('should return http 200 and API should return requested menu', async () => {
            await request(app)
                .get(
                    '/api/restaurants/567051/menus/%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%97%E0%B8%B9/short'
                )
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        name: 'ข้าวผัดปลาทู',
                        id: 'ข้าวผัดปลาทู',
                        thumbnailImage: expect.any(String),
                        discountedPercent: expect.any(Number),
                        fullPrice: expect.any(Number),
                        sold: expect.any(Number),
                        totalInStock: expect.any(Number),
                    });
                });
        });
    });
});

