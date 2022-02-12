import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (req: Request, res: Response)=>{
    try{
        const results = await store.index();
        res.json(results);
    }catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const show = async (req: Request, res: Response)=>{
    try{
        const results = await store.show(req.params.id);
        res.json(results);
    }catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }
}

const create = async(req: Request, res: Response)=>{
    try{
        const results = await store.create({name: req.body.name, price: req.body.price, url: req.body.url, description: req.body.description});
        res.json(results);
    }catch(err){
        throw new Error(`Something went wrong ... ${err}`);
    }

}


const productRoutes = (app: express.Application)=> {
    app.get("/products", index);
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default productRoutes;