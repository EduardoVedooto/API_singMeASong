import connection from "../database";
import { IRecommendation } from "../types/recommendationsTypes";

const insert = async (name: string, youtubeLink: string) => {
  try {
    await connection.query(`
      INSERT INTO recommendations 
      (name, "youtubeLink", score)
      VALUES ($1, $2, $3)
    `, [name, youtubeLink, 0]);
  } catch (err) {
    throw err;
  }
}

const getScoreById = async (id: string) => {
  try {
    const result = await connection.query("SELECT score FROM recommendations WHERE id = $1", [id]);
    return result.rows[0]?.score;
  } catch (err) {
    throw err;
  }
}

const updateScore = async (id: string, score: number) => {
  try {
    await connection.query(`UPDATE recommendations SET score = $1 WHERE id = $2`, [score, id]);
  } catch (err) {
    throw err;
  }
}

const removeRecommendation = async (id: string) => {
  try {
    await connection.query(`DELETE FROM recommendations WHERE id = $1`, [id]);
  } catch (err) {
    throw err;
  }
}

const lowerOrEqualThan10 = async (): Promise<IRecommendation> => {
  try {
    const result = await connection.query(`
      SELECT * 
      FROM recommendations 
      WHERE score <= 10 
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

const greaterThan10 = async (): Promise<IRecommendation> => {
  try {
    const result = await connection.query(`
      SELECT * 
      FROM recommendations 
      WHERE score > 10 
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

const rowCount = async () => {
  try {
    const result = await connection.query("SELECT * FROM recommendations");
    return result.rowCount;
  } catch (err) {
    throw err;
  }

}

export {
  insert,
  getScoreById,
  updateScore,
  removeRecommendation,
  lowerOrEqualThan10,
  greaterThan10,
  rowCount
};
