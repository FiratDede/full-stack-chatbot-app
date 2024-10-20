import mongoose, { Schema, } from 'mongoose';
import { IUser } from '../interfaces/IUser';


const userSchema: Schema = new Schema({
  username: {type:String, required: true, unique: true}, 
  password: {type:String, required: true, },
});


const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;