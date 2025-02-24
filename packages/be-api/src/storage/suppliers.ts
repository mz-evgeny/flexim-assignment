import { Supplier as ISupplier } from "src/interfaces/supplier";
import { Supplier } from "src/models/supplier";

export const getSuppliers = async (): Promise<ISupplier[]> => {
  const result = await Supplier.find().lean();

  return result;
};
