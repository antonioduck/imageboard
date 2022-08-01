const spicedPg = require("spiced-pg");
const username = "postgres";
const password = "postgres";
const database = "imageboard";

const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:${username}:${password}@localhost:5432/${database}`;
const db = spicedPg(dbUrl);
module.exports.getAllImages = () => {
    return db.query(`SELECT * FROM images
ORDER BY id DESC
LIMIT 4`);
};

module.exports.getMoreImages = (id) => {
    return db.query(
        `SELECT *, (SELECT id FROM images ORDER BY id ASC LIMIT 1) AS "lowestTableId" FROM images WHERE id < $1 ORDER BY id DESC LIMIT 4`,
        [id]
    );
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

module.exports.insertTheComment = (id, username, comment) => {
    return db.query(
        `INSERT INTO comments(image_id, username, comment)
            VALUES ($1, $2, $3) RETURNING *`,
        [id, username, comment]
    );
};

module.exports.getCommentsById = (id) => {
    return db.query(
        `SELECT * FROM comments WHERE image_id=$1 ORDER BY created_at DESC`,
        [id]
    );
};
