import getConnection from "../../connection/database";

const Rating = {
  getAllRating: async () => {
    const db = await getConnection();
    const sql = `SELECT id, user_id, book_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText FROM rating`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  getRating: async ({ ids }) => {
    const db = await getConnection();
    const sql = `SELECT id, user_id, book_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText FROM rating WHERE book_id IN (${ids})`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  getRatingsById: async ({ id }) => {
    const db = await getConnection();
    const sql = `SELECT id, user_id, book_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText FROM rating WHERE id IN (${id})`;

    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  getRatingsByBookId: async ({ id }) => {
    const db = await getConnection();
    const sql = `SELECT id, user_id, book_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText FROM rating WHERE book_id = ${id}`;

    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
  insertRating: async ({
    book_id,
    user_id,
    profileName,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  }) => {
    const db = await getConnection();
    const sql = `INSERT INTO rating (book_id, user_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText) VALUES ('${book_id}', '${user_id}', '${profileName}', '${reviewHelpfulness}', '${reviewScore}', '${reviewSummary}', '${reviewText}')`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },
};

export default Rating;
