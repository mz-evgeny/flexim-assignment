const { MongoClient } = require("mongodb");

const collections = [];

/** @type {import('umzug').MigrationFn<MongoClient>} */
exports.up = async ({ context }) => {
  await Promise.all(collections.map((name) => context.createCollection(name)));
};

/** @type {import('umzug').MigrationFn<MongoClient>} */
exports.down = async ({ context }) => {
  await Promise.all(collections.map((name) => context.collection(name).drop()));
};
