import ApiError from "../exception/api-error";

import { Request, Response, NextFunction } from "express";

export default (err:ApiError | any, req:Request, res:Response, next:NextFunction) => {
   
    if(err instanceof ApiError){
        return res.status(err.status).json({message:err.message, errors:err.error})
    }

    return res.status(500).json({message: "Ошибка"})
}