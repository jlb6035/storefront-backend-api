import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
    it('Should create a new product', async () => {
        const result = await store.create({name: 'Gamecube', price: 100});
        expect(result.name).toEqual('Gamecube');
    });

    it('It should return a product by ID', async ()=>{
        const result: Product = await store.show('1');
        expect(result.name).toEqual('Xbox');
    });

    it('It should return a list of products', async ()=> {
        const result: Product[] = await store.index();
        expect(result.length).toEqual(3);
    });
  });