import e from 'express';
import express, { Request, Response } from 'express';
import {  OrderStore } from '../models/order';
import { tokenValidation } from '../utils/tokenValidation';

const store = new OrderStore();

const index = async (req: Request, res: Response)=>{
    try{
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
    try{
        const newOrder = await store.create({status: req.body.status, user_id: req.body.user_id});
        res.json(newOrder);
    } catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const addProduct = async(req: Request, res: Response) => {
    try{
        const newProduct = await store.addProduct(req.body.quantity, req.params.id, req.body.productId);
        res.json(newProduct);
    } catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}



const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes;