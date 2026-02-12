import {Request, Response} from 'express';
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogViewModel} from "../models/BlogViewModel";
import {getViewBlogModel} from "../../../core/utils/view-model-mappers";

export function getBlogListHandler(req: Request, res: Response<BlogViewModel[]>) {
  const blogs = blogsRepository.findAll();
  console.log(blogs, 'blogs')
  const mappedBlogs: BlogViewModel[] = blogs.map(getViewBlogModel);
  res.send(mappedBlogs);
}
