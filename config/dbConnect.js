import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB CONNECTED ${connected.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
