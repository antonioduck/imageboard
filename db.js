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

module.exports.addImage = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url,username,title,description) VALUES($1,$2,$3,$4)RETURNING *`,
        [url, username, title, description]
    );
};

module.exports.getImagesInformation = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};
