# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index get("/products");
- Show get("/products/:id");
- Create [token required] post('/products');

#### Users
- Index [token required] get("/users");
- Show [token required] get("/users/:id");
- Create N[token required] post("/users");

#### Orders
- Current Order by user (args: user id)[token required] get('/orders/:id');

## Data Shapes
#### Product
-  id
- name
- price

CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name varchar(100), price NUMERIC(8,2));

#### User
- id
- firstName
- lastName
- password

CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname varchar(100), lastname varchar(100), password varchar(100));

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);