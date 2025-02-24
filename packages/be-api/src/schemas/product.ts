import { Schema } from "mongoose";
import { Product } from "src/interfaces/product";
import { Supplier } from "src/models/supplier";

export const ProductSchema = new Schema<Product>({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: Supplier, required: true },
  manufacturingDate: { type: Date, required: true },
});
