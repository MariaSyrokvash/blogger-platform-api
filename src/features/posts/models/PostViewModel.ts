/**
 * PostViewModel: The structure of the data returned by the server.
 */
export type PostViewModel = {
  /**
   * Internal unique identifier for the Post (string)
   */
  id: string;

  /**
   * Title of the post (max 30 characters in input)
   */
  title: string;

  /**
   * Short summary of the post (max 100 characters in input)
   */
  shortDescription: string;

  /**
   * Full content of the post (max 1000 characters in input)
   */
  content: string;

  /**
   * ID of the blog this post belongs to
   */
  blogId: string;

  /**
   * Name of the blog this post belongs to.
   * This field must be retrieved from the Blogs collection/repository.
   */
  blogName: string;
};
