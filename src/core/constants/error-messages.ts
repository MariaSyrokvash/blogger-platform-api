import {BLOGS_VALIDATION_LIMITS} from "../../features/blogs/constants/validation";

export const ERROR_MESSAGES = {
  // Common
  ID_MUST_BE_INT: 'ID must be an integer number',
  TYPE_STRING: 'Value must be a string',

  // Blogs
  BLOG_NAME: `Name is required and should be max ${BLOGS_VALIDATION_LIMITS.NAME_MAX} characters`,
  BLOG_DESCRIPTION: `Description is required and should be max ${BLOGS_VALIDATION_LIMITS.DESCRIPTION_MAX} characters`,
  BLOG_WEBSITE_URL: `WebsiteUrl is required, max ${BLOGS_VALIDATION_LIMITS.WEBSITE_URL_MAX} characters and must match HTTPS pattern`,
} as const;
