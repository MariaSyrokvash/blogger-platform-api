import {OutputBlogType} from "../types/blogs";
import {BlogViewModel} from "../../features/blogs/models/BlogViewModel";

export const getViewBlogModel = (dbBlog: OutputBlogType): BlogViewModel =>  {
  return {
    id: dbBlog.id,
    name: dbBlog.name,
    description: dbBlog.description,
    websiteUrl: dbBlog.websiteUrl,
  }
}
