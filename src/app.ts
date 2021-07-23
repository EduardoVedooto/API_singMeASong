import express from "express";
import cors from "cors";
import * as recommendationController from "./controllers/recommendationsController";
import * as genresController from "./controllers/genresController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => res.send("OK!"));
app.post("/recommendations", recommendationController.insert);
app.post("/recommendations/:id/upvote", recommendationController.vote);
app.post("/recommendations/:id/downvote", recommendationController.vote);
app.get("/recommendations/random", recommendationController.random);
app.get("/recommendations/top/:amount", recommendationController.top);
app.post("/genres", genresController.create);

export default app;
