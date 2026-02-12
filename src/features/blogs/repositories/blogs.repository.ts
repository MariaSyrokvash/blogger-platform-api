import {db} from "../../../db";
import {OutputBlogType} from "../../../core/types/blogs";
import {BlogInputModel} from "../models/CreateInputModel";

const dbBlogs = db.blogs;


export const blogsRepository = {
  findAll(): OutputBlogType[] {
    return dbBlogs;
  },

  findById(id: string): OutputBlogType | null {
    return dbBlogs.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },


  create(newBlog: OutputBlogType): OutputBlogType {
    dbBlogs.push(newBlog);

    return newBlog;
  },

  update(id: string, updatedBlog: BlogInputModel): boolean  {
    const blog = dbBlogs.find((d) => d.id === id);

    if (!blog) {
      return false;
    }

    blog.name = updatedBlog.name;
    blog.description = updatedBlog.description;
    blog.websiteUrl = updatedBlog.websiteUrl;

    return true;
  },

  delete(id: string) {
    const blogIndex = dbBlogs.findIndex((d) => d.id === id);

    if (blogIndex === -1) {
      return false;
    }

    dbBlogs.splice(blogIndex, 1);
    return true;
  }
};
