import request from 'supertest';

import { app } from '../../src/app';
import { APP_CONFIG } from '../../src/config';
import { HttpStatus } from '../../src/core/constants/statuses';
import { generateBasicAuthToken } from '../utils/auth';
import { blogsTestManager, postsTestManager } from '../utils/manager';
import { blogsTestData, postsTestData } from '../utils/data';
import { PostInputModel } from '../../src/features/posts/models/CreateInputModel';
import { PostViewModel } from '../../src/features/posts/models/PostViewModel';

describe('Posts API', () => {
  const adminToken = generateBasicAuthToken();

  beforeEach(async () => {
    await request(app)
      .delete(APP_CONFIG.PATH.TEST.BASE + APP_CONFIG.PATH.TEST.DB)
      .expect(HttpStatus.NoContent_204);
  });

  // ===========================================================================
  // GROUP: GET
  // ===========================================================================
  describe('GET Requests', () => {
    it('should return 200 and empty array', async () => {
      const res = await request(app).get(APP_CONFIG.PATH.POSTS.BASE).expect(HttpStatus.Ok_200, []);
    });

    it('should return 200 and a post by its ID', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      const res = await request(app)
        .get(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .expect(HttpStatus.Ok_200);

      expect(res.body).toEqual(createdPost);
    });

    it('should return 404 for not existing post', async () => {
      await request(app)
        .get(`${APP_CONFIG.PATH.POSTS.BASE}/non-existent-post-id`)
        .expect(HttpStatus.NotFound_404);
    });
  });

  // ===========================================================================
  // GROUP: POST
  // ===========================================================================
  describe('POST Requests', () => {
    it('should NOT create post without authorization', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const postData: PostInputModel = postsTestData.valid(createdBlog.id);

      await request(app)
        .post(APP_CONFIG.PATH.POSTS.BASE)
        .send(postData)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should NOT create post for a non-existing blog (blogId)', async () => {
      const invalidBlogPostData = postsTestData.invalid.blogId.notExist;

      await request(app)
        .post(APP_CONFIG.PATH.POSTS.BASE)
        .set('Authorization', adminToken)
        .send(invalidBlogPostData)
        .expect(HttpStatus.BadRequest_400);
    });

    it('should create post with correct data', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      expect(createdPost).toEqual<PostViewModel>({
        id: expect.any(String),
        title: postsTestData.valid(createdBlog.id).title,
        shortDescription: postsTestData.valid(createdBlog.id).shortDescription,
        content: postsTestData.valid(createdBlog.id).content,
        blogId: createdBlog.id,
        blogName: createdBlog.name,
      });
    });

    it('should NOT create post with incorrect input data (title too long)', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const invalidTitleData = postsTestData.invalid.title.tooLong(createdBlog.id);

      const res = await request(app)
        .post(APP_CONFIG.PATH.POSTS.BASE)
        .set('Authorization', adminToken)
        .send(invalidTitleData)
        .expect(HttpStatus.BadRequest_400);

      expect(res.body.errorsMessages).toBeDefined();
      expect(res.body.errorsMessages[0].field).toBe('title');
    });
  });

  // ===========================================================================
  // GROUP: PUT (UPDATE)
  // ===========================================================================
  describe('PUT Requests', () => {
    it('should NOT update post without authorization', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      const updateData: PostInputModel = {
        title: 'Updated Title',
        shortDescription: 'Updated short description',
        content: 'Updated content',
        blogId: createdBlog.id,
      };

      await request(app)
        .put(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .send(updateData)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should return 404 for a post that does not exist', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      const updateData: PostInputModel = {
        title: 'Updated Title',
        shortDescription: 'Updated short description',
        content: 'Updated content',
        blogId: createdBlog.id,
      };

      await request(app)
        .put(`${APP_CONFIG.PATH.POSTS.BASE}/non-existent-post-id-123`)
        .set('Authorization', adminToken)
        .send(updateData)
        .expect(HttpStatus.NotFound_404);
    });

    it('should update existing post with correct input data', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      const updateData: PostInputModel = {
        title: 'Updated Title',
        shortDescription: 'Updated short description',
        content: 'Updated content',
        blogId: createdBlog.id,
      };

      await request(app)
        .put(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .set('Authorization', adminToken)
        .send(updateData)
        .expect(HttpStatus.NoContent_204);

      const getRes = await request(app)
        .get(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .expect(HttpStatus.Ok_200);

      expect(getRes.body).toEqual<PostViewModel>({
        id: createdPost.id,
        ...updateData,
        blogName: createdPost.blogName,
      });
    });

    it('should NOT update post with incorrect data (title too long)', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      const invalidTitleData = postsTestData.invalid.title.tooLong(createdBlog.id);

      const res = await request(app)
        .put(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .set('Authorization', adminToken)
        .send(invalidTitleData)
        .expect(HttpStatus.BadRequest_400);

      expect(res.body.errorsMessages[0].field).toBe('title');

      const checkRes = await request(app)
        .get(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .expect(HttpStatus.Ok_200);

      expect(checkRes.body.title).toBe(postsTestData.valid(createdBlog.id).title);
    });
  });

  // ===========================================================================
  // GROUP: DELETE
  // ===========================================================================
  describe('DELETE Requests', () => {
    it('should NOT delete post without authorization', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      await request(app)
        .delete(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should return 404 for a post that does not exist', async () => {
      await request(app)
        .delete(`${APP_CONFIG.PATH.POSTS.BASE}/non-existent-post-id-999`)
        .set('Authorization', adminToken)
        .expect(HttpStatus.NotFound_404);
    });

    it('should delete existing post and return 204', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdPost } = await postsTestManager.createPost(createdBlog.id);

      await request(app)
        .delete(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .set('Authorization', adminToken)
        .expect(HttpStatus.NoContent_204);

      await request(app)
        .get(`${APP_CONFIG.PATH.POSTS.BASE}/${createdPost.id}`)
        .expect(HttpStatus.NotFound_404);

      await request(app).get(APP_CONFIG.PATH.POSTS.BASE).expect(HttpStatus.Ok_200, []);
    });
  });
});
