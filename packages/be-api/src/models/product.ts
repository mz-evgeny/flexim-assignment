import { model } from "mongoose";
import { ProductSchema } from "src/schemas/product";

export const Product = model("Product", ProductSchema);
