import {Response} from 'express';
import {TypedRequestParamsBody} from "../../../core/types";
import {HttpStatus} from "../../../core/constants/statuses";
import {postsRepository} from "../repositories/posts.repository";
import {URIParamsPostModel} from "../models/URIParamsBlogModel";
import {PostInputModel} from "../models/UpdateInputModel";

export function updatePostHandler(req: TypedRequestParamsBody< URIParamsPostModel, PostInputModel>, res: Response) {
  const postId = req.params.id;
  const post = postsRepository.findById(postId);

  if (!post) {
    res.sendStatus(HttpStatus.NotFound_404)
    return;
  }

  const isUpdated = postsRepository.update(postId, req.body);

  isUpdated
    ? res.sendStatus(HttpStatus.NoContent_204)
    : res.sendStatus(HttpStatus.NotFound_404);
}
