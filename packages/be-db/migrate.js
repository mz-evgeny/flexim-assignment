const { Umzug, MongoDBStorage } = require("umzug");
const { MongoClient } = require("mongodb");
const { DB_NAME, DB_URL } = require("shared");

(async () => {
  try {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db(DB_NAME);
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
