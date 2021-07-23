import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { genreBody as body, createGenre } from "../factories/genresFactory";
import wipeTable from "../utils/wipeTable";

const agent = supertest(app);

beforeAll(async () => await wipeTable("genres"));

describe("POST /genres", () => {
  it("should returns status 400 when body is invalid", async () => {
    const result = await agent.post("/genres").send({ name: "" });
    expect(result.status).toBe(400);
  });

  it("should returns status 409 when category already exists", async () => {
    await wipeTable("genres");
    await createGenre("test");
    const result = await agent.post("/genres").send({ name: "test" });
    expect(result.status).toBe(409);
  });

  it("should returns status 201 when body is valid", async () => {
    const result = await agent.post("/genres").send(body);
    expect(result.status).toBe(201);
  });
});

afterAll(() => connection.end());