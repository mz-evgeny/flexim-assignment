import { model } from "mongoose";
import { SupplierSchema } from "src/schemas/supplier";

export const Supplier = model("Supplier", SupplierSchema);
