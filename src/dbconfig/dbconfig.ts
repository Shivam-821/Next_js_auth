import mongoose from "mongoose";

export async function connect() {
  try {
    const mongo_uri: string = process.env.MONGO_URI!;

    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(mongo_uri, { dbName: "next_auth" });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`MongoDB connected successfully`);
    });

    connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
  } catch (error) {
    console.error(`Something went wrong while connecting: ${error}`);
  }
}
