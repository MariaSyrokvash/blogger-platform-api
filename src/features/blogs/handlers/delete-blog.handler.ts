import { Response } from 'express';
import { BlogViewModel } from '../models/BlogViewModel';
import { TypedRequestParams } from '../../../core/types';
import { HttpStatus } from '../../../core/constants/statuses';
import { URIParamsBlogModel } from '../models/URIParamsBlogModel';
import { blogsRepository } from '../repositories/blogs.repository';

export function deleteBlogHandler(
  req: TypedRequestParams<URIParamsBlogModel>,
  res: Response<BlogViewModel>
) {
  const id = req.params.id;

  const blog = blogsRepository.findById(id);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }

  const isDeleted = blogsRepository.delete(id);
  isDeleted ? res.sendStatus(HttpStatus.NoContent_204) : res.sendStatus(HttpStatus.NotFound_404);
}
