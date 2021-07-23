import supertest from "supertest";
import connection from "../../src/database";
import faker from "faker";
import app from "../../src/app";

const body = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2)),
  youtubeLink: "https://www.youtube.com/watch?v=GUeYTWXn0Qk"
}

const createRecommendation = async () => {
  await supertest(app).post("/recommendations").send(body);
}

export { createRecommendation, body };