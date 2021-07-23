import express from "express";
import cors from "cors";
import * as recommendationController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => res.send("OK!"));
app.post("/recommendations", recommendationController.insert);

export default app;
