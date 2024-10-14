import mongoose  from "mongoose";
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';


export const connectDb = async () => {
  try {
      await mongoose.connect(MONGODB_URI);
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


