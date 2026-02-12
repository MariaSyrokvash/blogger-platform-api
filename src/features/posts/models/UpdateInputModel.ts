/**
 * PostInputModel: The structure of the data sent by the client.
 */
export type PostInputModel = {
  /**
   * Title of the post.
   * Validation: string, max 30 chars.
   */
  title: string;

  /**
   * Short summary of the post.
   * Validation: string, max 100 chars.
   */
  shortDescription: string;

  /**
   * Full content of the post.
   * Validation: string, max 1000 chars.
   */
  content: string;

  /**
   * ID of the existing blog this post should be linked to.
   * Validation: must be a valid ID from the Blogs repository.
   */
  blogId: string;
};
