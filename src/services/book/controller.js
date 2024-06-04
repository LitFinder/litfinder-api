import getConnection from "../../connection/database";

const Book = {
  getBooks: async ({ limit = 10, page = 1 }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    const sql = `SELECT * FROM book LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await db.execute(sql);

    return results;
  },
  getBookByIds: async ({ ids, limit = 10, page = 1 }) => {
    const offset = (page - 1) * limit;

    const db = await getConnection();
    const sql = `SELECT * FROM book WHERE id IN (${ids}) LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await db.execute(sql);

    return results;
  },
};

export default Book;
