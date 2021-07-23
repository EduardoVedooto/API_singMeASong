import connection from "../../src/database";
import faker from "faker";
import { IBody } from "../../src/types/recommendationsTypes";
import supertest from "supertest";
import app from "../../src/app";

export const body: IBody = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2)),
  genresIds: [1],
  youtubeLink: "https://www.youtube.com/watch?v=GUeYTWXn0Qk",
}

export const createRecommendation = async () => {
  await supertest(app).post("/recommendations").send(body);
}