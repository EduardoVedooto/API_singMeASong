import connection from "../../src/database";
import faker from "faker";
import { IBody } from "../../src/types/recommendationsTypes";

export const body: IBody = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2)),
  genresIds: [1],
  youtubeLink: "https://www.youtube.com/watch?v=GUeYTWXn0Qk",
}

export const createRecommendation = async (score?: number) => {
  try {
    await connection.query(`
    INSERT INTO recommendations 
    (name, "youtubeLink", score)
    VALUES ($1, $2, $3)
  `, [body.name, body.youtubeLink, score || 0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}