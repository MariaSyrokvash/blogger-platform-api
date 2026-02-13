import { NextFunction, Request, Response } from 'express';
import { APP_CONFIG } from '../../config';
import { HttpStatus } from '../constants/statuses';

const BASIC_AUTH_SCHEME = 'Basic ';
const BASIC_AUTH_CREDENTIALS_SEPARATOR = ':';
const BASIC_AUTH_SPLIT_PARTS_LIMIT = 2;

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BASIC_AUTH_SCHEME)) {
    res.sendStatus(HttpStatus.Unauthorized_401);
    return;
  }

  const base64Credentials = authHeader.slice(BASIC_AUTH_SCHEME.length);

  let decoded: string;
  try {
    decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  } catch {
    res.sendStatus(HttpStatus.Unauthorized_401);
    return;
  }

  const [login, password] = decoded.split(
    BASIC_AUTH_CREDENTIALS_SEPARATOR,
    BASIC_AUTH_SPLIT_PARTS_LIMIT
  );

  if (login !== APP_CONFIG.AUTH.BASIC.LOGIN || password !== APP_CONFIG.AUTH.BASIC.PASSWORD) {
    res.sendStatus(HttpStatus.Unauthorized_401);
    return;
  }

  next();
};
