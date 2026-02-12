import {param} from "express-validator";
import {ERROR_MESSAGES} from "../constants/error-messages";

export const idValidator = param('id')
  .isInt().withMessage(ERROR_MESSAGES.ID_MUST_BE_INT);
