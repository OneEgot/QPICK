import mongoose from "mongoose";

import { IToken } from "../../Types/types";

const TokenModel = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    refreshtoken:{type:String, required:true}
})

export default mongoose.model<IToken>('Token',TokenModel )