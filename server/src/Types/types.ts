import { Document } from "mongoose";

export interface IUser extends Document{
    username:string,
    password:string;
}

export interface IToken extends Document{
    userId:string;
    refreshtoken:string
}

export interface IUserRes {
    user: {
       id:string;
       username:string;
    },
    tokens:{
        accesToken:string;
        refreshToken:string;
    }
}

export interface iTokensInterface{
    accesToken:string;
    refreshToken:string;
}