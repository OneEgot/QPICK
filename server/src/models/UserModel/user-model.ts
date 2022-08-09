import mongoose, {Schema} from "mongoose"

import {IUser} from "../../Types/types"

const UserModel = new Schema({
    username:{type: String, required:true},
    password:{type: String, required:true}
})

export default mongoose.model<IUser>("User", UserModel)

