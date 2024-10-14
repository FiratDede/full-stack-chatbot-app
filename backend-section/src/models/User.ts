import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
   
  }

const userSchema: Schema = new Schema({
  username: {type:String, required: true}, // String is shorthand for {type: String}
  password: {type:String, required: true},
});


const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;