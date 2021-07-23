import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import faker from "faker";
import connection from "../../src/database";

const body = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2)),
  youtubeLink: "https://www.youtube.com/watch?v=GUeYTWXn0Qk"
}

describe("POST /recommendations", () => {
  it("should returns status 400 when name is invalid", async () => {
    const response = await supertest(app).post("/recommendations").send({ ...body, name: "" });
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when youtube's link is invalid", async () => {
    const response = await supertest(app).post("/recommendations").send({ ...body, youtubeLink: "" });
    expect(response.status).toBe(400);
  });

  it("should returns status 201 when body is valid", async () => {
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.text).toBe("Created");
    expect(response.status).toBe(201);
  });
});

afterAll(() => {
  connection.end();
});
