import { Response } from 'express';
import { db } from '../../../db';
import { OutputBlogType } from '../../../core/types/blogs';
import { TypedRequestBody } from '../../../core/types';
import { HttpStatus } from '../../../core/constants/statuses';
import { BlogViewModel } from '../models/BlogViewModel';
import { BlogInputModel } from '../models/CreateInputModel';
import { blogsRepository } from '../repositories/blogs.repository';

export function createBlogHandler(
  req: TypedRequestBody<BlogInputModel>,
  res: Response<BlogViewModel>
) {
  const { name, websiteUrl, description } = req.body;

  const newBlog: OutputBlogType = {
    id: String(db.blogs.length ? +db.blogs[db.blogs.length - 1].id + 1 : 1),
    name,
    websiteUrl,
    description,
  };

  blogsRepository.create(newBlog);
  res.status(HttpStatus.Created_201).send(newBlog);
}
