import { Request, Response } from 'express';
import * as recommendationsService from "../services/recommendationsService";

const insert = async (req: Request, res: Response) => {
  try {
    await recommendationsService.insert(req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err.status === 400) return res.status(400).send(err.message);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

export { insert };