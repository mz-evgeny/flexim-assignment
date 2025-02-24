import { Product } from "src/models/product";
import { Product as IProduct } from "src/interfaces/product";
import { PAGINATION_LIMIT, Params } from "shared";
import { FilterQuery } from "mongoose";

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

interface Result {
  data: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getProducts(params: Params): Promise<Result> {
  const page = params.page ? parseInt(params.page) : 1;
  const limit = params.limit ? parseInt(params.limit) : PAGINATION_LIMIT;
  const { sortField = "sku", sortOrder = "ascend", searchTerm = "" } = params;

  const skip = (page - 1) * limit;

  const match: FilterQuery<IProduct> = {};
  if (searchTerm) {
    const escapedSearchTerm = escapeRegExp(searchTerm);

    match.$or = [
      { sku: { $regex: escapedSearchTerm, $options: "i" } },
      { name: { $regex: escapedSearchTerm, $options: "i" } },
    ];
  }

  const sortOptions: Record<string, 1 | -1> = {};
  if (sortField === "supplier") {
    sortOptions["supplier.name"] = sortOrder === "ascend" ? 1 : -1;
  } else {
    sortOptions[sortField] = sortOrder === "ascend" ? 1 : -1;
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
    page: page,
    totalPages: Math.ceil(total / limit),
  };
}
