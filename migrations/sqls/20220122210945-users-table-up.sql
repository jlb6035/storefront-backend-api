/* Replace with your SQL commands */
CREATE TABLE users (id SERIAL PRIMARY KEY, firstname varchar(100), lastname varchar(100), password varchar(100));
INSERT INTO users (firstname, lastname, password) VALUES ('Foo', 'Bar', 'abc123');