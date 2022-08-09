import User from "../models/UserModel/user-model";

import bcrypt from "bcrypt";

import TokenServices from "./token-services";

import IUser from "../DTOS/dtos";

import { IUserRes } from "../Types/types"

import ApiError from "../exception/api-error";

class UserSerices{

    public async registration(username:string, password:string):Promise<IUserRes>{
        const candidate = await User.findOne({username});

        if(candidate) throw ApiError.BadRequest(`Пользователь c ${username} уже существует`);

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({username:username, password:hashPassword});
        
        const UserDto:IUser = new IUser(user.username, user.id);

        const tokens = TokenServices.generateTokens({...UserDto});
    
        await TokenServices.saveToken(user._id, tokens.accesToken);
        
        const UserRes = {
            user:{
                ...UserDto
            },
            tokens:{
                ...tokens
            }
        }
        return {...UserRes};
    };

    public async login(username:string, password:string):Promise<IUserRes>{
        const user = await User.findOne({username});

        if(!user) throw ApiError.BadRequest(`Пользователь c ${username} уже существует`);

        const candidatePassword = await bcrypt.compare(password, user.password);

        if(!candidatePassword) throw ApiError.BadRequest("Неверный пароль");

        const UserDto:IUser = new IUser(user.username, user.id);

        const tokens = TokenServices.generateTokens({...UserDto});

        await TokenServices.saveToken(UserDto.id, tokens.refreshToken);

        const UserRes = {
            user:{
                ...UserDto
            },
            tokens:{
                ...tokens
            }
        }

        return {...UserRes};

    }
}
export default new UserSerices;
