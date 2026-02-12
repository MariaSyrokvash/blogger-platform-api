import { Response, Router } from 'express';
import { APP_CONFIG } from '../../config';
import { db } from '../../db';
import { HttpStatus } from '../../core/constants/statuses';

export const testRouter = Router();

testRouter.delete(APP_CONFIG.PATH.TEST.DB, (_, res: Response) => {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(HttpStatus.NoContent_204);
});
