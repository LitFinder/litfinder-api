import getConnection from "../../connection/database";
import hashPassword from "../../utils/hashPassword";

const Profile = {
  getProfile: async ({ user_id }) => {
    const db = await getConnection();
    const sql = `SELECT id, email, username, name, bio, imageProfile, createdAt, updatedAt FROM user WHERE id = ${user_id}`;
    const [results] = await db.execute(sql);

    db.end();

    return results[0];
  },

  updateUserProfile: async ({ column, value, user_id }) => {
    if (!column || !value) {
      throw new Error("No column or value provided");
    }

    const db = await getConnection();
    const sql = `UPDATE user SET ${column} = "${value}" WHERE id = ${user_id}`;
    const [results] = await db.execute(sql);

    db.end();

    return results;
  },

  updateProfile: async ({ user_id, name, password }) => {
    if (!user_id) {
      throw new Error("No user_id provided");
    }

    const db = await getConnection();
    let sql;
    let results;

    if (name && password) {
      // Update both name and password
      const hashedPassword = await hashPassword(password);
      sql = `UPDATE user SET name = ?, password = ?, updatedAt = NOW() WHERE user_id = ?`;
      [results] = await db.execute(sql, [name, hashedPassword, user_id]);
    } else if (name) {
      // Update only name
      sql = `UPDATE user SET name = ?, updatedAt = NOW() WHERE user_id = ?`;
      [results] = await db.execute(sql, [name, user_id]);
    } else if (password) {
      // Update only password
      const hashedPassword = await hashPassword(password);
      sql = `UPDATE user SET password = ?, updatedAt = NOW() WHERE user_id = ?`;
      [results] = await db.execute(sql, [hashedPassword, user_id]);
    } else {
      throw new Error("No valid fields to update");
    }

    db.end();

    return results;
  },
};

export default Profile;
