import jwt from 'jsonwebtoken';

import IUser from '../DTOS/dtos';

import TokenModel from '../models/TokenModel/token-model';

import {iTokensInterface} from "../Types/types"

class TokenService{

    public generateTokens(payload:IUser):iTokensInterface{
        
        const accesToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn:"30m"
        });

        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn:"30d"
        });
    
        return{
            accesToken,
            refreshToken
        }
    }

    public async saveToken(userid:string, refreshToken:string):Promise<string>{

        const token = await TokenModel.findOne({user: userid});

        if(token){
            token.refreshtoken = refreshToken;

            await token.save();

            return token.refreshtoken;
        }

        const newToken = await TokenModel.create({user:userid, refreshtoken:refreshToken});

        return newToken.refreshtoken;
    }

}
export default new TokenService;