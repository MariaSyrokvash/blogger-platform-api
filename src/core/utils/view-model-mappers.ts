import { OutputBlogType } from '../types/blogs';
import { BlogViewModel } from '../../features/blogs/models/BlogViewModel';
import { PostViewModel } from '../../features/posts/models/PostViewModel';
import { OutputPostType } from '../types/posts';

export const getViewBlogModel = (dbBlog: OutputBlogType): BlogViewModel => {
  return {
    id: dbBlog.id,
    name: dbBlog.name,
    description: dbBlog.description,
    websiteUrl: dbBlog.websiteUrl,
  };
};

export const getViewPostModel = (dbPost: OutputPostType): PostViewModel => {
  return {
    id: dbPost.id,
    title: dbPost.title,
    shortDescription: dbPost.shortDescription,
    content: dbPost.content,
    blogId: dbPost.blogId,
    blogName: dbPost.blogName,
  };
};
