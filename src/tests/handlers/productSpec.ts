import supertest from 'supertest';
import { Product } from '../../models/product';
import app from '../../server';

const request = supertest(app);

describe('Test Product Handlers', () => {
    it('Successfully returns a list of products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200)
    });

    it('Successfully returns a product based on id', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200)
    });

    it('Should create a new product', async () => {
        const res = await request.post('/users').send({firstname: 'Test3', lastname: 'User', password: 'abc123'});

        const response = await request.post('/products').send({name: 'Nintendo 64', price: 100}).set('Authorization', `Bearer ${res.body}`);
        expect(response.status).toBe(200);
    });
 
 
});