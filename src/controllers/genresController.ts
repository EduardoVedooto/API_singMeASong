import { Request, Response } from "express";
import * as genresService from "../services/genresService";

export const create = async (req: Request, res: Response) => {
  try {
    await genresService.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err.status) res.status(err.status).send(err.message);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

export const read = async (req: Request, res: Response) => {
  try {
    const result = await genresService.read();
    res.send(result);
  } catch (err) {
    if (err.status) res.status(err.status).send(err.message);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  }
}