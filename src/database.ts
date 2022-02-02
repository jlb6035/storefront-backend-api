import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    PORT
} = process.env;

let client;


if(process.env.NODE_ENV === 'dev') {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: PORT as unknown as number,
    })
  }
  
  if(process.env.NODE_ENV === 'test') {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: PORT as unknown as number,
    })
  }

  console.log(process.env.NODE_ENV);


export default client;