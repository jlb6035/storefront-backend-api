CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name varchar(100), price NUMERIC(8,2));
INSERT INTO products (name, price) VALUES ('Xbox', 500.00);