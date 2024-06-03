import getConnection from "../../connection/database";

const Rating = {
  getRating: async ({ title_book }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM rating WHERE title IN (${title_book})`;
    const [results] = await db.execute(sql);
    return results;
  },
};

export default Rating;
