import { Router } from 'express';
import { APP_CONFIG } from '../../../config';
import { basicAuthMiddleware } from '../../../core/middlewares/basic-auth-middleware';

import { getPostListHandler } from '../handlers/get-post-list.handler';
import { getPostByIdHandler } from '../handlers/get-post-by-id.handler';
import { createPostHandler } from '../handlers/create-post.handler';
import { updatePostHandler } from '../handlers/update-post.handler';
import { deletePostHandler } from '../handlers/delete-post.handler';

import {
  createPostValidationMiddleware,
  postIdValidationMiddleware,
  updatePostValidationMiddleware,
} from '../middlewares/posts-validators';

export const postsRouter = Router({});

postsRouter
  .get(APP_CONFIG.PATH.ROOT, getPostListHandler)

  .get(APP_CONFIG.PATH.POSTS.BY_ID, ...postIdValidationMiddleware, getPostByIdHandler)

  .post(
    APP_CONFIG.PATH.ROOT,
    basicAuthMiddleware,
    ...createPostValidationMiddleware,
    createPostHandler
  )
  .put(
    APP_CONFIG.PATH.POSTS.BY_ID,
    basicAuthMiddleware,
    ...updatePostValidationMiddleware,
    updatePostHandler
  )

  .delete(
    APP_CONFIG.PATH.POSTS.BY_ID,
    basicAuthMiddleware,
    ...postIdValidationMiddleware,
    deletePostHandler
  );
