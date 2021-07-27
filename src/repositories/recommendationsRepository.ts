import connection from "../database";
import { IRecommendation } from "../types/recommendationsTypes";

export const insert = async (name: string, youtubeLink: string): Promise<number> => {
  try {
    const result = await connection.query(`
      INSERT INTO recommendations 
      (name, "youtubeLink", score)
      VALUES ($1, $2, $3)
      RETURNING id
    `, [name, youtubeLink, 0]);
    return result.rows[0].id;
  } catch (err) {
    throw err;
  }
}

export const getScoreById = async (id: string): Promise<undefined | number> => {
  try {
    const result = await connection.query("SELECT score FROM recommendations WHERE id = $1", [id]);
    return result.rows[0]?.score;
  } catch (err) {
    throw err;
  }
}

export const updateScore = async (id: string, score: number) => {
  try {
    await connection.query(`UPDATE recommendations SET score = $1 WHERE id = $2`, [score, id]);
  } catch (err) {
    throw err;
  }
}

export const removeRecommendation = async (id: string) => {
  try {
    await connection.query(`DELETE FROM recommendations WHERE id = $1`, [id]);
  } catch (err) {
    throw err;
  }
}

export const lowerOrEqualThan10 = async (): Promise<IRecommendation> => {
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

export const greaterThan10 = async (): Promise<IRecommendation> => {
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

export const rowCount = async (): Promise<number> => {
  try {
    const result = await connection.query("SELECT * FROM recommendations");
    return result.rowCount;
  } catch (err) {
    throw err;
  }
}

export const getTopRank = async (offset: number): Promise<IRecommendation[]> => {
  try {
    const result = await connection.query(`
      SELECT * FROM recommendations ORDER BY score DESC LIMIT $1
    `, [offset]);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

export const insertGenre = async (genreId: number, recommendationId: number) => {
  try {
    await connection.query(`
      INSERT INTO genres_recommendations ("genreId","recommendationId")
      VALUES ($1,$2)
    `, [genreId, recommendationId]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}