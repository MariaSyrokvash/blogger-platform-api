export const BLOGS_VALIDATION_LIMITS = {
  NAME_MAX: 15,
  DESCRIPTION_MAX: 500,
  WEBSITE_URL_MAX: 100,
  WEBSITE_URL_PATTERN: /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
} as const;
