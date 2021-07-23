import connection from "../database";
import DBException from "../exceptions/DBException";

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
    if (!result.rowCount) throw new DBException("NOT_FOUNDED", `Recommendation not founded. ID (${id}) invalid.`);
    return result.rows[0].score;
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

export { insert, getScoreById, updateScore, removeRecommendation };
