import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore{
    async index(): Promise<User[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM USERS;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async show(id: string): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async create(user: User): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *;';
            const hash = bcrypt.hashSync(user.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
            const result = await conn.query(sql, [user.firstname, user.lastname, hash]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Something went wrong... ${err}`);
        }
    }

    async authenticate(user: User): Promise<User>{
        const conn = await Client.connect();
        const sql = "SELECT password FROM users WHERE firstname = ($1) AND lastname = ($2)";
        const result = await conn.query(sql, [user.firstname, user.lastname]);

        if(result){
            const password = result.rows[0].password;
            if (bcrypt.compareSync(user.password + process.env.BCRYPT_PASSWORD, password.toString())) {
                console.log("Authentication Success!");
                return user
              }
        }
        return null;
    }
}