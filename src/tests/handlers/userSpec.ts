import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);


describe('Test User Handlers', () => {
    it('Successfully returns a list of users', async () => {
        const res = await request.post('/users').send({firstname: 'Test3', lastname: 'User', password: 'abc123'});

        const response = await request.get('/users').set('Authorization', `Bearer ${res.body}`);
        expect(response.status).toBe(200)
    });


    it('Successfully returns a user by id', async () => {
        const res = await request.post('/users').send({firstname: 'Test4', lastname: 'User', password: 'abc123'});

        const response = await request.get('/users/1').set('Authorization', `Bearer ${res.body}`);
        expect(response.status).toBe(200)
    });
 
});