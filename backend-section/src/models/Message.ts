import mongoose, { Schema } from 'mongoose';
import { MessageOwner } from '../enums/MessageOwner';
import { IMessage } from '../interfaces/IMessage';

const messageSchema: Schema = new Schema({
    owner: {
        type: String,
        enum: [MessageOwner.ChatBot,MessageOwner.User],
        required: true
    },
    userSessionId: {
        type: Schema.Types.ObjectId,
        ref: 'UserSession',
        required: true
    },
    content: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Message: mongoose.Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;