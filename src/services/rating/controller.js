import getConnection from "../../connection/database";

const Rating = {
  getAllRating: async () => {
    const db = await getConnection();
    const sql = `SELECT * FROM rating`;
    const [results] = await db.execute(sql);

    return results;
  },
  getRating: async ({ title_book }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM rating WHERE title IN (${title_book})`;
    const [results] = await db.execute(sql);
    return results;
  },
  getRatingsById: async ({ id }) => {
    const db = await getConnection();
    const sql = `SELECT * FROM rating WHERE id IN (${id})`;

    const [results] = await db.execute(sql);
    return results;
  },
  insertRating: async ({
    title,
    user_id,
    profileName,
    reviewHelpfulness,
    reviewScore,
    reviewSummary,
    reviewText,
  }) => {
    const db = await getConnection();
    const sql = `INSERT INTO rating (title, user_id, profileName, reviewHelpfulness, reviewScore, reviewSummary, reviewText) VALUES ('${title}', '${user_id}', '${profileName}', '${reviewHelpfulness}', '${reviewScore}', '${reviewSummary}', '${reviewText}')`;
    const [results] = await db.execute(sql);

    return results;
  },
};

export default Rating;
