import getConnection from "../../connection/database";

const Bookself = {
  getMyBookSelf: async ({ user_id, limit = 10, page = 1, filter = "all" }) => {
    const offset = (page - 1) * limit;
    const db = await getConnection();
    let sql = "";
    if (filter == "want" || filter == "read" || filter == "finish") {
      sql = `SELECT * FROM bookself WHERE user_id = ${user_id} AND status = '${filter}' ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;
    } else {
      sql = `SELECT * FROM bookself WHERE user_id = ${user_id} ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;
    }

    const [results] = await db.execute(sql);

    return results;
  },
  updateBookself: async ({ id, status, rating_id }) => {
    const db = await getConnection();
    if (rating_id) {
      const sql = `UPDATE bookself SET status = '${status}', rating_id = ${rating_id} WHERE id = ${id}`;
      const [results] = await db.execute(sql);
      return results;
    }

    const sql = `UPDATE bookself SET status = '${status}' WHERE id = ${id}`;
    const [results] = await db.execute(sql);

    return results;
  },
  insertBookself: async ({ user_id, book_id }) => {
    const db = await getConnection();
    const sql = `INSERT INTO bookself (user_id, book_id) VALUES (${user_id}, ${book_id})`;
    const [results] = await db.execute(sql);

    return results;
  },
  findBookself: async ({ user_id, book_id }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM bookself WHERE user_id = ${user_id} AND book_id = ${book_id}`;
    const [results] = await db.execute(sql);

    return results;
  },
};

export default Bookself;
