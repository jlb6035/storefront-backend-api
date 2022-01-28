# storefront-backend-api
This project is an API built using node.js, typescript, express and postgres. The application allows users to create products and add those products to an order.

## Environment setup

Clone the project, run npm install, setup a postgres DB. Create 2 databases, one will be a test DB, and add a .env file with the following properties...

POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
BCRYPT_PASSWORD=
SALT_ROUNDS=10
TOKEN_SECRET=
NODE_ENV=dev

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Inside .env file set NODE_ENV=test
Run `npm run test` to execute the unit tests via Jasmine
