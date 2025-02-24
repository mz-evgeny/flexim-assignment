import { Schema } from "mongoose";
import { Supplier } from "src/interfaces/supplier";

export const SupplierSchema = new Schema<Supplier>({
  name: { type: String, required: true },
  country: { type: String, required: true },
});
