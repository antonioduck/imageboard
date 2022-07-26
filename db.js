const spicedPg = require("spiced-pg");
const username = "postgres";
const password = "postgres";
const database = "imageboard";

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres:${username}:${password}@localhost:5432/${database}`;
const db = spicedPg(dbUrl);
module.exports.getAllImages = () => {
  return db.query(`SELECT * FROM images`);
};
