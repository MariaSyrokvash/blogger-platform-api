import {Request, Response} from 'express';
import {postsRepository} from "../repositories/posts.repository";
import {PostViewModel} from "../models/PostViewModel";
import {getViewPostModel} from "../../../core/utils/view-model-mappers";

export function getPostListHandler(req: Request, res: Response<PostViewModel[]>) {
  const posts = postsRepository.findAll();

  const mappedBlogs: PostViewModel[] = posts.map(getViewPostModel);
  res.send(mappedBlogs);
}
