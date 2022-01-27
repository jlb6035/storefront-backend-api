import Client from "../database";

export type Order = {
    status: string,
    user_id: number
};

export class OrderStore{
    async index(): Promise<Order[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async show(id: string): Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async create(order: Order): Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;';
            const result = await conn.query(sql, [order.status, order.user_id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const conn = await Client.connect();
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
          const result = await conn.query(sql, [quantity, orderId, productId]);    
          conn.release()
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
}