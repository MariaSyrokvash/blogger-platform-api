import {Response} from 'express';
import {PostViewModel} from "../models/PostViewModel";
import {TypedRequestParams} from "../../../core/types";
import {HttpStatus} from "../../../core/constants/statuses";
import {URIParamsPostModel} from "../models/URIParamsBlogModel";
import {postsRepository} from "../repositories/posts.repository";
import {getViewPostModel} from "../../../core/utils/view-model-mappers";

export function getPostByIdHandler(req: TypedRequestParams<URIParamsPostModel>, res: Response<PostViewModel>) {
  const id = req.params.id;

  const post = postsRepository.findById(id);

  if (!post) {
    res.sendStatus(HttpStatus.NotFound_404)
    return;
  }

   res.send(getViewPostModel(post));
}
