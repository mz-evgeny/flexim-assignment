import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "shared";

export const connect = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI || `${DB_URL}/${DB_NAME}`);
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};
