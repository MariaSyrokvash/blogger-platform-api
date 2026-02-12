/**
 * Data for updating Blog entity
 */
export type BlogInputModel = {
  /**
   * name: string
   * maxLength: 15
   * required: true
   */
  name: string;

  /**
   * description: string
   * maxLength: 500
   * required: true
   */
  description: string;

  /**
   * websiteUrl: string
   * maxLength: 100
   * pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
   * required: true
   */
  websiteUrl: string;
};
