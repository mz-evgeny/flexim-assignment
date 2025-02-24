const { Umzug, MongoDBStorage } = require("umzug");
const { MongoClient } = require("mongodb");

(async () => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("flexim");
    const collection = db.collection("migrations");

    const umzug = new Umzug({
      migrations: { glob: "migrations/*.js" },
      storage: new MongoDBStorage({ collection }),
      context: db,
      logger: console,
    });

    await umzug.runAsCLI();
    await client.close();
  } catch (error) {
    console.error(error);
  }
})();
