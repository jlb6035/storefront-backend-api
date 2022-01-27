import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
    it('index method should return one result', async () => {
        const result: Product[] = await store.index();
        expect(result.length).toEqual(1);
    });

    it('It should return a product by ID', async ()=>{
        const result: Product = await store.show('1');
        expect(result.name).toEqual('Xbox');
    });

    it('It should create a new product', async ()=> {
        await store.create({name: 'Playstation', price: 600.00});
        const result: Product[] = await store.index();
        expect(result.length).toEqual(2);
    });
  });