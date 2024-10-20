import mongoose  from "mongoose";
import { mongoDbUri } from "../constants/envVariables";


export const connectDb = async () => {
  try {
      await mongoose.connect(mongoDbUri);
    console.log('Connected to db!');
  } catch (error) {
    console.error('Error connection db', error);
    console.log("Trying connecting db in 1.5 seconds")
    setTimeout(connectDb,1500);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log("Db connection lost, Trying connecting db in 1.5 seconds ");
  setTimeout(connectDb,1500);

});


