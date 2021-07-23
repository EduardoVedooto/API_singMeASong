import express from "express";
import cors from "cors";
import { recommendationsRouter } from "./routes/recommendationsRouter";
import { genresRouter } from "./routes/genresRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use(recommendationsRouter);
app.use(genresRouter);

export default app;
