/**
 * View model for Blog entity
 */
export type BlogViewModel = {
  /**
   * id: string
   * required: true
   */
  id: string;

  /**
   * name: string
   * required: true
   */
  name: string;

  /**
   * description: string
   * required: true
   */
  description: string;

  /**
   * websiteUrl: string
   * required: true
   */
  websiteUrl: string;
};
