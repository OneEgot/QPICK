import User from "../models/UserModel/user-model"

import UserServices from "../services/user-services";

import { Request, Response, NextFunction } from "express";

import {validationResult} from "express-validator";

import ApiError from "../exception/api-error";

class UserController{
    public async Registration(req:Request, res:Response, next:NextFunction):Promise<Response>{
        try{
            const error = validationResult(req);

            if(!error.isEmpty()) {
                return next(ApiError.BadRequest("Некорректные данный при вводе"));
            }

            const {username, password} = req.body;

            const candidate = await UserServices.registration(username, password);

            return res.status(200).json(candidate);
        }catch(err){
            next(err);
        }
    };

    public async Login(req:Request, res:Response, next: NextFunction):Promise<Response>{
        try{
            const {username, password} = req.body;

            const user = await UserServices.login(username, password);

            res.cookie("refreshToken", user.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})

            return res.status(200).json({...user});
        }catch(err){
            next(err);
        }
    }
}

export default new UserController;