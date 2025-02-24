import { Document } from "mongoose";
import { Supplier } from "./supplier";

export interface Product extends Document {
  sku: string;
  name: string;
  description: string;
  supplierId: Supplier['_id'];
  manufacturingDate: Date;
}
