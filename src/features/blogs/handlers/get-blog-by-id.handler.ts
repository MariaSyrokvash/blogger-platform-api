import { Response } from 'express';
import { BlogViewModel } from '../models/BlogViewModel';
import { TypedRequestParams } from '../../../core/types';
import { HttpStatus } from '../../../core/constants/statuses';
import { URIParamsBlogModel } from '../models/URIParamsBlogModel';
import { blogsRepository } from '../repositories/blogs.repository';

export function getBlogByIdHandler(
  req: TypedRequestParams<URIParamsBlogModel>,
  res: Response<BlogViewModel>
) {
  const id = req.params.id;

  const blog = blogsRepository.findById(id);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }

  res.send(blog);
}
