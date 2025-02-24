import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/flexim"
  );
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};
