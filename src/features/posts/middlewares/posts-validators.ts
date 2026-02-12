import {idValidator} from "../../../core/validators";
import {inputValidationMiddleware} from "../../../core/middlewares/input-validation-middleware";
import {body} from "express-validator";
import {POSTS_VALIDATION_LIMITS} from "../constants/validation";
import {ERROR_MESSAGES} from "../../../core/constants/error-messages";


// --- Validators ---
export const inputModelValidation = [
  body('title')
    .isString().withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: POSTS_VALIDATION_LIMITS.TITLE_MAX })
    .withMessage(ERROR_MESSAGES.POST_TITLE),

  body('shortDescription')
    .isString().withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: POSTS_VALIDATION_LIMITS.SHORT_DESCRIPTION_MAX })
    .withMessage(ERROR_MESSAGES.POST_SHORT_DESCRIPTION),

  body('content')
    .isString().withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: POSTS_VALIDATION_LIMITS.CONTENT_MAX })
    .withMessage(ERROR_MESSAGES.POST_CONTENT),

  body('blogId')
    .isString()
    .trim()
    .withMessage(ERROR_MESSAGES.TYPE_STRING)
];


// --- Middlewares ---
//  GET/:id,  DELETE/:id
export const postIdValidationMiddleware = [
  idValidator,
  inputValidationMiddleware
];

// POST
export const createPostValidationMiddleware = [
  ...inputModelValidation, // array body()
  inputValidationMiddleware
];


// PUT
export const updatePostValidationMiddleware = [
  idValidator,
  ...inputModelValidation,
  inputValidationMiddleware
];
