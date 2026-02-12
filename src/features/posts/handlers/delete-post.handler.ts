import {Response} from 'express';
import {PostViewModel} from "../models/PostViewModel";
import {TypedRequestParams} from "../../../core/types";
import {HttpStatus} from "../../../core/constants/statuses";
import {postsRepository} from "../repositories/posts.repository";
import {URIParamsPostModel} from "../models/URIParamsBlogModel";

export function deletePostHandler(req: TypedRequestParams<URIParamsPostModel>, res: Response<PostViewModel>) {
  const id = req.params.id;

  const post = postsRepository.findById(id);

  if (!post) {
    res.sendStatus(HttpStatus.NotFound_404)
    return;
  }

  const isDeleted = postsRepository.delete(id);

  isDeleted
    ? res.sendStatus(HttpStatus.NoContent_204)
    : res.sendStatus(HttpStatus.NotFound_404);
}
