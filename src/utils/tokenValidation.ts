import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const tokenValidation = (req: Request, res: Response) => {
    try{
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET);
    } catch(err){
        res.status(401);
        res.json(`Invalid Token... ${err}`);
        return;
    }
}
