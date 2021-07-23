import * as genresController from "../controllers/genresController";
import express from "express";

const router = express.Router();

router.post("/genres", genresController.create);
router.get("/genres", genresController.read);

export { router as genresRouter };