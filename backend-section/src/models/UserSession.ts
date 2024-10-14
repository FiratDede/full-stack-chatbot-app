import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import questions from '../constants/questions';

export interface IUserSession extends Document {
    userId: ObjectId
    startedAt: Date,
    endedAt: Date | null,
   questionsAndAnswers: Array<Object>
   
  }

const userSessionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startedAt: {type: Date, default: Date.now},
    endedAt: Date,
    questionsAndAnswers: {type: Array<Object>, default: [{kind: "Question", content: questions[0]}]}
});

const UserSession: mongoose.Model<IUserSession> = mongoose.model<IUserSession>('UserSession', userSessionSchema);

export default UserSession;