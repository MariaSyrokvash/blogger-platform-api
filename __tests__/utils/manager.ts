import request from 'supertest';
import { app } from '../../src/app';
import { APP_CONFIG } from '../../src/config';
import { BlogInputModel } from '../../src/features/blogs/models/CreateInputModel';
import { HttpStatus } from '../../src/core/constants/statuses';
import { generateBasicAuthToken } from './auth';
import { postsTestData } from './data';
import { getViewBlogModel, getViewPostModel } from '../../src/core/utils/view-model-mappers';

export const blogsTestManager = {
  async createBlog(data: BlogInputModel, expectedStatusCode: number = HttpStatus.Created_201) {
    const token = generateBasicAuthToken();

    const response = await request(app)
      .post(APP_CONFIG.PATH.BLOGS.BASE)
      .set('Authorization', token)
      .send(data)
      .expect(expectedStatusCode);

    return {
      response,
      createdBlog: getViewBlogModel(response.body),
    };
  },
};

export const postsTestManager = {
  async createPost(blogId: string, expectedStatusCode: number = HttpStatus.Created_201) {
    const token = generateBasicAuthToken();
    const postData = postsTestData.valid(blogId);

    const response = await request(app)
      .post(APP_CONFIG.PATH.POSTS.BASE)
      .set('Authorization', token)
      .send(postData)
      .expect(expectedStatusCode);

    return {
      response,
      createdPost: getViewPostModel(response.body),
    };
  },
};
