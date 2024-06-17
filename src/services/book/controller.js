import getConnection from "../../connection/database";

const Book = {
  getAllBooks: async () => {
    const db = await getConnection();
    const sql = `SELECT * FROM book`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  getBooks: async ({ limit = 10, page = 1, search = "" }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE title LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  getBookByIds: async ({ ids, limit = 10, page = 1, isLimit = true }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    if (isLimit) {
      const sql = `SELECT * FROM book WHERE id IN (${ids}) ${
        ids.length != 0 ? "ORDER BY FIELD(id, " + ids + ")" : ""
      } LIMIT ${limit} OFFSET ${offset}`;
      const [results] = await db.execute(sql);

      db.end();

      return results;
    } else {
      const sql = `SELECT * FROM book WHERE id IN (${ids}) ${
        ids.length != 0 ? "ORDER BY FIELD(id, " + ids + ")" : ""
      }`;
      const [results] = await db.execute(sql);

      db.end();

      return results;
    }
  },

  findBook: async ({ id }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE id = "${id}"`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },

  getBookByCategory: async ({ category, limit = 10, page = 1 }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE categories LIKE "%${category}%" LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
};

export default Book;
