import getConnection from "../../connection/database";

const Book = {
  getBooks: async ({ limit = 10, page = 1, search = "" }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE title LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await db.execute(sql);

    return results;
  },
  getBookByIds: async ({ ids, limit = 10, page = 1, isLimit = true }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    if (isLimit) {
      const sql = `SELECT * FROM book WHERE id IN (${ids}) LIMIT ${limit} OFFSET ${offset}`;
      const [results] = await db.execute(sql);

      return results;
    } else {
      const sql = `SELECT * FROM book WHERE id IN (${ids})`;
      const [results] = await db.execute(sql);

      return results;
    }
  },

  findBook: async ({ id }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE id = "${id}"`;
    const [results] = await db.execute(sql);

    return results;
  },
};

export default Book;
