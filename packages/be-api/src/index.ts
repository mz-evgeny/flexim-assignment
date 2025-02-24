import express from "express";
import { connect, disconnect } from "src/utils/db";
import { getPaginatedProducts } from "./storage/products";
import { getSuppliers } from "./storage/suppliers";

const app = express();
const port = 8000;

app.get("/products", async (req, res) => {
  const result = await getPaginatedProducts(req.query);

  res.send(result);
});

app.get("/suppliers", async (req, res) => {
  const result = await getSuppliers();

  res.send(result);
});

app.listen(port, async () => {
  await connect();
  console.info(`🚀 Server ready at port : ${port}`);
});

const closeApp = async () => {
  await disconnect();
  console.info("🛑 Database connection closed.");
  process.exit(0);
};

process.on("SIGINT", closeApp);
process.on("SIGTERM", closeApp);
