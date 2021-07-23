import { Request, Response } from 'express';
import * as recommendationsService from "../services/recommendationsService";

const insert = async (req: Request, res: Response) => {
  try {
    await recommendationsService.insert(req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err.status) return res.status(err.status).send(err.message);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

const vote = async (req: Request, res: Response) => {
  try {
    await recommendationsService.handleVote(req.path, req.params.id);
    res.sendStatus(200);
  } catch (err) {
    if (err.status) return res.status(err.status).send(err.message);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

const random = async (req: Request, res: Response) => {
  try {
    const result = await recommendationsService.generateRandom();
    res.send(result);
  } catch (err) {
    if (err.status) return res.status(err.status).send(err.message);
    console.error(err);
    res.sendStatus(500);
  }
}

const top = async (req: Request, res: Response) => {
  try {
    const result = await recommendationsService.topRank(req.params.amount);
    res.send(result);
  } catch (err) {
    if (err.status) return res.status(err.status).send(err.message);
    console.error(err);
    res.sendStatus(500);
  }
}
export { insert, vote, random, top };