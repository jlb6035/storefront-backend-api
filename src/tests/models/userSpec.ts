import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
    it('index method should return one result', async () => {
        const result: User[] = await store.index();
        expect(result.length).toEqual(4);
    });

    it('It should return a user by ID', async ()=>{
        const result: User = await store.show('1');
        expect(result.firstname).toEqual('Test2');
    });

    it('It should create a new user', async ()=> {
        await store.create({firstname: 'James', lastname: 'Brown', password: 'abc123'});
        const result: User[] = await store.index();
        expect(result.length).toEqual(5);
    });
  });