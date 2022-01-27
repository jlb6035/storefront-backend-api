import express, { Request, Response } from 'express';
import { UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { tokenValidation } from '../utils/tokenValidation';

const store = new UserStore();

const index = async (req: Request, res: Response)=>{
    try{
        tokenValidation(req, res);
        const results = await store.index();
        res.json(results);
    } catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const show = async (req: Request, res: Response)=>{
    try{
        tokenValidation(req, res);
        const results = await store.show(req.params.id);
        res.json(results);
    } catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const create = async(req: Request, res: Response)=>{
    const newUser = await store.create({firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password});
    try{
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET);
        res.json(token);
    } catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const userRoutes = (app: express.Application)=>{
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
}

export default userRoutes;