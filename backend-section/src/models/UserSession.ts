import mongoose, { Schema } from 'mongoose';
import { IUserSession } from '../interfaces/IUserSession';


const userSessionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startedAt: {type: Date, default: Date.now},
    endedAt: Date,
    titleNo: {type: Schema.Types.Number},
});

userSessionSchema.pre('save', async function (next) {
    if (this.isNew) {
      // Aynı kategoriye sahip belgeler arasında en büyük sıra numarasını bul
      const lastDocument = await UserSession.findOne({userId: this.userId}).sort("-startedAt")
  
      // Eğer o kategoriye ait belge varsa sırayı artır, yoksa 0'dan başla
      this.titleNo = lastDocument ? lastDocument.titleNo + 1 : 1;
    }
    next();
  });

const UserSession: mongoose.Model<IUserSession> = mongoose.model<IUserSession>('UserSession', userSessionSchema);


export default UserSession;