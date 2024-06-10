import getConnection from "../../connection/database";

const Genre = {
  getGenre: async () => {
    const db = await getConnection();
    const sql = `SELECT * FROM genre`;
    const [results] = await db.execute(sql);

    db.end();
    
    return results;
  },
};

export default Genre;
