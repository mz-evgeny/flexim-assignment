import { Product } from "src/models/product";
import { Product as IProduct } from "src/interfaces/product";

interface Params {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
}

interface Result {
  data: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getPaginatedProducts({
  page = 1,
  limit = 50,
  sortField = "sku",
  sortOrder = "asc",
  searchTerm = "",
}: Params): Promise<Result> {
  const skip = (page - 1) * limit;

  const match: any = {};
  if (searchTerm) {
    match.$or = [
      { sku: { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ];
  }

  const sortOptions: any = {};
  if (sortField === "supplier") {
    sortOptions["supplier.name"] = sortOrder === "asc" ? 1 : -1;
  } else {
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
  }

  const [result] = await Product.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplierId",
        foreignField: "_id",
        as: "supplier",
      },
    },
    { $unwind: "$supplier" },
    {
      $facet: {
        data: [
          { $sort: sortOptions },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: 1,
              sku: 1,
              name: 1,
              description: 1,
              supplierId: "$supplier._id",
              manufacturingDate: 1,
            },
          },
        ],
        total: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    },
  ]);

  const total = result.total[0]?.count || 0;

  return {
    data: result.data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
