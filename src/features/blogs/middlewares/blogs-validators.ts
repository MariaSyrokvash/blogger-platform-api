import { body } from 'express-validator';
import { idValidator } from '../../../core/validators';
import { inputValidationMiddleware } from '../../../core/middlewares/input-validation-middleware';
import { BLOGS_VALIDATION_LIMITS } from '../constants/validation';
import { ERROR_MESSAGES } from '../../../core/constants/error-messages';

// --- Validators ---
export const blogInputModelValidator = [
  body('name')
    .isString()
    .withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: BLOGS_VALIDATION_LIMITS.NAME_MAX })
    .withMessage(ERROR_MESSAGES.BLOG_NAME),

  body('description')
    .isString()
    .withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: BLOGS_VALIDATION_LIMITS.DESCRIPTION_MAX })
    .withMessage(ERROR_MESSAGES.BLOG_DESCRIPTION),

  body('websiteUrl')
    .isString()
    .withMessage(ERROR_MESSAGES.TYPE_STRING)
    .trim()
    .isLength({ min: 1, max: BLOGS_VALIDATION_LIMITS.WEBSITE_URL_MAX })
    .withMessage(ERROR_MESSAGES.BLOG_WEBSITE_URL)
    .matches(BLOGS_VALIDATION_LIMITS.WEBSITE_URL_PATTERN)
    .withMessage(ERROR_MESSAGES.BLOG_WEBSITE_URL),
];

// --- Middlewares ---
//  GET/:id,  DELETE/:id PUT/:id
export const blogIdValidationMiddleware = [idValidator, inputValidationMiddleware];

// POST
export const createBlogValidationMiddleware = [
  ...blogInputModelValidator, // Разворачиваем цепочку body()
  inputValidationMiddleware,
];

// PUT
export const updateBlogValidationMiddleware = [
  idValidator,
  ...blogInputModelValidator, // Разворачиваем цепочку body()
  inputValidationMiddleware,
];
