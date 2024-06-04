import getConnection from "../../connection/database";

const Log = {
  sendLog: async ({ userId, bookId }) => {
    const db = await getConnection();
    const sql = `INSERT INTO log (user_id, book_id) VALUES (${userId}, ${bookId})`;
    await db.execute(sql);

    return true;
  },

  getLogByUserId: async ({ userId }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM log JOIN book ON book.id=log.book_id WHERE user_id = ${userId} GROUP BY book_id ORDER BY createdAt DESC`;
    const [results] = await db.execute(sql);

    return results;
  },
};

export default Log;
