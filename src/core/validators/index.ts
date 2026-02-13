import { param } from 'express-validator';
import { ERROR_MESSAGES } from '../constants/error-messages';

export const idValidator = [
  param('id')
    .isString()
    .withMessage(ERROR_MESSAGES.ID_MUST_BE_STRING)
    .trim()
    .notEmpty()
    .withMessage(ERROR_MESSAGES.REQUIRED),
];
