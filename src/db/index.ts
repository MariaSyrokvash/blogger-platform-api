import { blogMocks, postMocks } from './mock-data';
import { OutputBlogType } from '../core/types/blogs';
import { OutputPostType } from '../core/types/posts';

export type DBType = {
  blogs: OutputBlogType[];
  posts: OutputPostType[];
};

export const db: DBType = {
  blogs: blogMocks,
  posts: postMocks,
};
