import {db} from "../../../db";
import {OutputBlogType} from "../../../core/types/blogs";
import {BlogInputModel} from "../models/CreateInputModel";


export const blogsRepository = {
  findAll(): OutputBlogType[] {
    return db.blogs;
  },

  findById(id: string): OutputBlogType | null {
    return db.blogs.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },


  create(newBlog: OutputBlogType): OutputBlogType {
    db.blogs.push(newBlog);

    return newBlog;
  },

  update(id: string, updatedBlog: BlogInputModel): void  {
    const blog = db.blogs.find((d) => d.id === id);

    if (!blog) {
      throw new Error('Blog not exist');
    }

    blog.name = updatedBlog.name;
    blog.description = updatedBlog.description;
    blog.websiteUrl = updatedBlog.websiteUrl;

    return;
  },

  delete(id: string) {
    const blogIndex = db.blogs.findIndex((d) => d.id === id);

    if (blogIndex === -1) {
      throw new Error('Blog not exist');
    }

    db.blogs.splice(blogIndex, 1);
    return;
  }
};
