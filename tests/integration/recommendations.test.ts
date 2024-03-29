import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { body, createRecommendation } from "../factories/recommendationFactory";
import wipeTable from "../utils/wipeTable";
import { IRecommendation } from "../../src/types/recommendationsTypes";

const agent = supertest(app);

beforeAll(() => wipeTable("recommendations"));

describe("POST /recommendations", () => {
  it("should returns status 400 when name is invalid", async () => {
    const response = await agent.post("/recommendations").send({ ...body, name: "" });
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when youtube's link is invalid", async () => {
    const response = await agent.post("/recommendations").send({ ...body, youtubeLink: "" });
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when genres's array is invalid", async () => {
    const response = await agent.post("/recommendations").send({ ...body, genresIds: ["invalid"] });
    expect(response.status).toBe(400);
  });

  it("should returns status 201 when body is valid", async () => {
    const response = await agent.post("/recommendations").send(body);
    expect(response.text).toBe("Created");
    expect(response.status).toBe(201);
  });
});

describe("POST upvote or downvote", () => {
  it("should returns status 400 when id is invalid", async () => {
    const response = await agent.post("/recommendations/id/upvote");
    expect(response.status).toBe(400);
  });

  it("should returns status 404 when id doesn't match with any valid recommendation", async () => {
    const response = await agent.post("/recommendations/10/upvote");
    expect(response.status).toBe(404);
  });

  it("should returns status 200 when id is valid", async () => {
    await wipeTable("recommendations");
    await createRecommendation()
    const response = await agent.post("/recommendations/1/upvote");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });
});

describe("GET /recommendations/random", () => {
  it("should returns status 200 when called", async () => {
    await createRecommendation();
    const result = await agent.get("/recommendations/random");
    expect(result.status).toBe(200);
  });

  it("should returns a body with the following keys: id, name, youtubeLink, score.", async () => {
    await createRecommendation();
    const result = await agent.get("/recommendations/random");
    const recommendation: IRecommendation = result.body;
    expect(recommendation).toHaveProperty("id");
    expect(recommendation).toHaveProperty("name");
    expect(recommendation).toHaveProperty("youtubeLink");
    expect(recommendation).toHaveProperty("score");
  });

  it("should returns status 404 when recommendations list is empty", async () => {
    await wipeTable("recommendations");
    const result = await agent.get("/recommendations/random");
    expect(result.status).toBe(404);
  });
});

describe("GET /recommendations/top/:amount", () => {
  it("should returns status 200 when called", async () => {
    for (let i = 0; i < 5; i++) await createRecommendation();
    const result = await agent.get("/recommendations/top/2");
    expect(result.status).toBe(200);
  });

  it("should returns a body containing a array with length equals or lower than the amount", async () => {
    for (let i = 0; i < 5; i++) await createRecommendation();
    const result = await agent.get("/recommendations/top/5");
    expect(result.body.length).toBeLessThanOrEqual(5);
  });

  it("should returns status 404 when recommendations list is empty", async () => {
    await wipeTable("recommendations");
    const result = await agent.get("/recommendations/top/2");
    expect(result.status).toBe(404);
  });

  it("should returns status 400 when amount value is invalid or negative", async () => {
    const result = await agent.get("/recommendations/top/invalid");
    expect(result.status).toBe(400);
  });
});

afterAll(() => connection.end());