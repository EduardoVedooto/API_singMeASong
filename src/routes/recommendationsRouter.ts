import * as recommendationController from "../controllers/recommendationsController";
import express from "express";

const router = express.Router();

router.post("/recommendations", recommendationController.insert);
router.post("/recommendations/:id/upvote", recommendationController.vote);
router.post("/recommendations/:id/downvote", recommendationController.vote);
router.get("/recommendations/random", recommendationController.random);
router.get("/recommendations/top/:amount", recommendationController.top);

export { router as recommendationsRouter };