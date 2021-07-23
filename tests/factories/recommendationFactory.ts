import supertest from "supertest";
import connection from "../../src/database";
import faker from "faker";
import app from "../../src/app";

const body = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2)),
  youtubeLink: "https://www.youtube.com/watch?v=GUeYTWXn0Qk"
}

const createRecommendation = async (score?: number) => {
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

export { createRecommendation, body };