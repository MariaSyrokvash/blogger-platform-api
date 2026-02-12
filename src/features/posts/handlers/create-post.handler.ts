import {Response} from 'express';
import {db} from "../../../db";
import {TypedRequestBody} from "../../../core/types";
import {HttpStatus} from "../../../core/constants/statuses";
import {PostViewModel} from "../models/PostViewModel";
import {PostInputModel} from "../models/CreateInputModel";
import {postsRepository} from "../repositories/posts.repository";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";

export function createPostHandler(req: TypedRequestBody<PostInputModel>, res: Response<PostViewModel>) {
  const { title, shortDescription, content, blogId } = req.body;

  const blog = blogsRepository.findById(blogId);

  if (!blog) {
    res.sendStatus(HttpStatus.BadRequest_400);
    return;
  }

  const newPost = postsRepository.create({
    id: String(db.posts.length ? +(db.posts[db.posts.length - 1].id) + 1 : 1),
    title,
    shortDescription,
    content,
    blogId,
    blogName: blog.name,
  });

  postsRepository.create(newPost);
  res.status(HttpStatus.Created_201).send(newPost);
}
