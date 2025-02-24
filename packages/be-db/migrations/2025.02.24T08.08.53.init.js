const { MongoClient } = require("mongodb");

const collections = ["suppliers", "products"];

const suppliers = [
  { name: "Supplier A", country: "USA" },
  { name: "Supplier B", country: "Germany" },
  { name: "Supplier C", country: "Japan" },
  { name: "Supplier D", country: "Canada" },
  { name: "Supplier E", country: "Brazil" },
  { name: "Supplier F", country: "Australia" },
  { name: "Supplier G", country: "India" },
  { name: "Supplier H", country: "South Korea" },
];

const products = [
  {
    sku: "P001",
    name: "Product 1",
    description: "Description 1",
    manufacturingDate: new Date(),
  },
  {
    sku: "P002",
    name: "Product 2",
    description: "Description 2",
    manufacturingDate: new Date(),
  },
  {
    sku: "P003",
    name: "Product 3",
    description: "Description 3",
    manufacturingDate: new Date(),
  },
  {
    sku: "P004",
    name: "Product 4",
    description: "Description 4",
    manufacturingDate: new Date(),
  },
  {
    sku: "P005",
    name: "Product 5",
    description: "Description 5",
    manufacturingDate: new Date(),
  },
];

/** @type {import('umzug').MigrationFn<MongoClient>} */
exports.up = async ({ context }) => {
  await Promise.all(collections.map((name) => context.createCollection(name)));

  const supplierDocs = await context
    .collection("suppliers")
    .insertMany(suppliers);

  const productsWithSupplierIds = Object.values(
    supplierDocs.insertedIds
  ).reduce((acc, item, index) => {
    products.forEach((product) => {
      acc.push({
        ...product,
        sku: `${product.sku}-${index}`,
        supplierId: item,
      });
    });

    return acc;
  }, []);

  await context.collection("products").insertMany(productsWithSupplierIds);
};

/** @type {import('umzug').MigrationFn<MongoClient>} */
exports.down = async ({ context }) => {
  await context.collection("products").deleteMany({
    name: {
      $in: ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"],
    },
  });

  await context.collection("suppliers").deleteMany({
    name: { $in: ["Supplier A", "Supplier B", "Supplier C"] },
  });

  await Promise.all(collections.map((name) => context.collection(name).drop()));
};
