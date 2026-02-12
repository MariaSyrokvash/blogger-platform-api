import { Router } from "express";
import { APP_CONFIG } from "../../../config";
import { basicAuthMiddleware } from "../../../core/middlewares/basic-auth-middleware";
import {
  blogIdValidationMiddleware,
  createVideoValidationMiddleware,
  updateVideoValidationMiddleware
} from "../middlewares/blogs-validators";
import { getBlogListHandler } from "../handlers/get-blog-list.handler";
import { getBlogByIdHandler } from "../handlers/get-blog-by-id.handler";
import { createBlogHandler } from "../handlers/create-blog.handler";
import {updateBlogHandler} from "../handlers/update-blog.handler";
import {deleteBlogHandler} from "../handlers/delete-blog.handler";

export const blogsRouter = Router({});

blogsRouter
  .get(APP_CONFIG.PATH.ROOT, getBlogListHandler)

  .get(APP_CONFIG.PATH.BLOGS.BY_ID, ...blogIdValidationMiddleware, getBlogByIdHandler)

  .post(
    APP_CONFIG.PATH.ROOT,
    basicAuthMiddleware,
    ...createVideoValidationMiddleware,
    createBlogHandler
  )
  .put(
    APP_CONFIG.PATH.BLOGS.BY_ID,
    basicAuthMiddleware,
    ...updateVideoValidationMiddleware,
    updateBlogHandler,
    )

  .delete(
    APP_CONFIG.PATH.BLOGS.BY_ID,
    basicAuthMiddleware,
    ...blogIdValidationMiddleware,
    deleteBlogHandler
  );
