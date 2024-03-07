import mongoose, { ConnectOptions } from "mongoose";

const openDataBase = async () => {
  console.log(`Connecting to database`);
  if (mongoose.connection.readyState !== 1) {
    try {
      const options: ConnectOptions = {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      };
      const connection = await mongoose.connect(
        "mongodb://127.0.0.1:27017/coffee",
        options
      );
      console.log("Connected to MongoDB DataBase");
      return connection;
    } catch (err: any) {
      console.error(
        "MongoDB connection error. Please make sure MongoDB is running. "
      );
      throw new Error(err);
    }
  }
};

export default openDataBase;
