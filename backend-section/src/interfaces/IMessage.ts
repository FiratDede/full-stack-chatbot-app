import { MessageOwner } from "../enums/MessageOwner";
import { Document, ObjectId } from 'mongoose';

export interface IMessage extends Document {
    owner: MessageOwner;
    content: string;
    userSessionId: ObjectId;
}