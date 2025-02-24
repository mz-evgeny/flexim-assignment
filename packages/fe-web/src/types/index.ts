type Date = string;
type ID = string;

export type Product = {
  _id: ID;
  sku: string;
  name: string;
  description: string;
  supplierId: Supplier["_id"];
  manufacturingDate: Date;
};

export type Supplier = {
  _id: ID;
  name: string;
  country: string;
};

export type QueryString = {
  page?: string;
  limit?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
};
