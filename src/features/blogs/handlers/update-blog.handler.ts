import { Response } from 'express';
import { TypedRequestParamsBody } from '../../../core/types';
import { BlogInputModel } from '../models/CreateInputModel';
import { URIParamsBlogModel } from '../models/URIParamsBlogModel';
import { HttpStatus } from '../../../core/constants/statuses';
import { blogsRepository } from '../repositories/blogs.repository';

export function updateBlogHandler(
  req: TypedRequestParamsBody<URIParamsBlogModel, BlogInputModel>,
  res: Response
) {
  const id = req.params.id;
  const blog = blogsRepository.findById(id);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }

  const isUpdated = blogsRepository.update(id, req.body);
  isUpdated ? res.sendStatus(HttpStatus.NoContent_204) : res.sendStatus(HttpStatus.NotFound_404);
}
