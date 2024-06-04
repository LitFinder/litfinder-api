import getConnection from "../../connection/database";

const Log = {
  sendLog: async ({ userId, bookId }) => {
    const db = await getConnection();
    const sql = `INSERT INTO log (user_id, book_id) VALUES (${userId}, ${bookId})`;
    await db.execute(sql);

    return true;
  },
};

export default Log;
