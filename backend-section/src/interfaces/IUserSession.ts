import  { Document, ObjectId } from 'mongoose';

export interface IUserSession extends Document {
    userId: ObjectId
    startedAt: Date,
    endedAt: Date | null,
    titleNo: number
   
  }