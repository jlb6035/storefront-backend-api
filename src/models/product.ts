import Client from "../database";

export type Product = {
    name: string;
    price: number;
    url: string;
    description: string;
}


export class ProductStore{
    async index(): Promise<Product[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async show(id: string): Promise<Product>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async create(product: Product): Promise<Product>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *;';
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }
}