/* Replace with your SQL commands */
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

INSERT INTO order_products (quantity, order_id, product_id) VALUES (3, 1, 1);