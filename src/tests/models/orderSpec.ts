import { Order, OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order Model", () => {
    it('Should create a new Order', async () => {
        const result = await store.create({status: 'Active', user_id: 1});
        expect(result.status).toEqual('Active');
    });

    it('It should return a order by ID', async ()=>{
        const result: Order = await store.show('1');
        expect(result.status).toEqual('Active');
    });

    it('It should return a list of orders', async ()=> {
        const result: Order[] = await store.index();
        expect(result.length).toEqual(2);
    });
  });