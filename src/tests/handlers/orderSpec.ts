import supertest from 'supertest';
import { Order } from '../../models/order';
import app from '../../server';

const request = supertest(app);

describe('Test Order Handlers', () => {
    it('Successfully returns a list of orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200)
    });
 
    it('Should return a order based on ID', async () => {
        const res = await request.post('/users').send({firstname: 'Test2', lastname: 'User', password: 'abc123'});

        const response = await request.get('/orders/1').set('Authorization', `Bearer ${res.body}`);
        expect(response.status).toBe(200);
    }); 

     it('Should create a new order', async () => {
        const response = await request.post('/orders').send({status: 'Active', user_id: 1});
        expect(response.status).toBe(200);
    });
    
    it('Should add a product', async () => {
        const response = await request.post('/orders/1/products').send({quantity: 10, productId: 1});
        expect(response.status).toBe(200);
    });
});