import getConnection from "../../connection/database";

const Preference = {
  insertGenrePreference: async ({ user_id, genres = [] }) => {
    const db = await getConnection();

    // delete berdasarkan user
    const queryDelete = `DELETE FROM preference_genre WHERE user_id = ${user_id}`;
    await db.execute(queryDelete);

    genres.forEach(async (genre) => {
      const sql = `INSERT INTO preference_genre (user_id, genre_id) VALUES ('${user_id}', '${genre}')`;
      await db.execute(sql);
    });

    db.end();

    return true;
  },
  insertBookPreference: async ({ user_id, books = [] }) => {
    const db = await getConnection();

    // delete berdasarkan user
    const queryDelete = `DELETE FROM preference_book WHERE user_id = ${user_id}`;
    await db.execute(queryDelete);

    books.forEach(async (book) => {
      const sql = `INSERT INTO preference_book (user_id, book_id) VALUES ('${user_id}', '${book}')`;
      await db.execute(sql);
    });

    db.end();

    return true;
  },
  getGenreByUserId: async (userId) => {
    const db = await getConnection();
    const sql = `SELECT genre.id, genre.name FROM preference_genre JOIN genre ON preference_genre.genre_id = genre.id WHERE preference_genre.user_id = ${userId}`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
};

export { Preference };
