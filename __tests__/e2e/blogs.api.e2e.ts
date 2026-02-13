import request from 'supertest';
import { app } from '../../src/app';
import { APP_CONFIG } from '../../src/config';
import { HttpStatus } from '../../src/core/constants/statuses';
import { generateBasicAuthToken } from '../utils/auth';
import { blogsTestManager } from '../utils/manager';
import { blogsTestData } from '../utils/data';

describe('Blogs API', () => {
  const adminToken = generateBasicAuthToken();

  beforeEach(async () => {
    await request(app).delete(APP_CONFIG.PATH.TEST.BASE + APP_CONFIG.PATH.TEST.DB);
  });

  // ===========================================================================
  // GROUP: GET
  // ===========================================================================
  describe('GET Requests', () => {
    it('returns an empty array if no blogs exist', async () => {
      await request(app).get(APP_CONFIG.PATH.BLOGS.BASE).expect(HttpStatus.Ok_200, []);
    });

    it('should return 200 and a blog by its ID', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      const res = await request(app)
        .get(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .expect(HttpStatus.Ok_200);

      expect(res.body).toEqual({
        id: createdBlog.id,
        ...blogsTestData.valid,
      });
    });

    it('should return 404 for not existing blog', async () => {
      await request(app)
        .get(`${APP_CONFIG.PATH.BLOGS.BASE}/non-existent-id`)
        .expect(HttpStatus.NotFound_404);
    });
  });

  // ===========================================================================
  // GROUP: POST
  // ===========================================================================
  describe('POST Requests', () => {
    it('should NOT create blog without authorization', async () => {
      await request(app)
        .post(APP_CONFIG.PATH.BLOGS.BASE)
        .send(blogsTestData.valid)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should create blog with correct data', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      expect(createdBlog).toEqual({
        id: expect.any(String),
        ...blogsTestData.valid,
      });
    });

    it('should NOT create blog with incorrect input data (Validation)', async () => {
      const { response } = await blogsTestManager.createBlog(
        blogsTestData.invalid.name.empty,
        HttpStatus.BadRequest_400
      );

      expect(response.body.errorsMessages).toBeDefined();
      expect(response.body.errorsMessages[0].field).toBe('name');
    });

    it('should check onlyFirstError for websiteUrl', async () => {
      // Combined case: too long + wrong pattern
      const websiteUrlTooLong = blogsTestData.invalid.websiteUrl.tooLong;
      const { response } = await blogsTestManager.createBlog(
        websiteUrlTooLong,
        HttpStatus.BadRequest_400
      );

      const websiteErrors = response.body.errorsMessages.filter(
        (e: any) => e.field === 'websiteUrl'
      );
      // If onlyFirstError works, length should be 1
      expect(websiteErrors).toHaveLength(1);
    });
  });

  // ===========================================================================
  // GROUP: PUT (UPDATE)
  // ===========================================================================
  describe('PUT Requests', () => {
    it('should NOT update blog without authorization', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);
      await request(app)
        .put(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .send(blogsTestData.valid)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should return 404 for a blog that does not exist', async () => {
      await request(app)
        .put(`${APP_CONFIG.PATH.BLOGS.BASE}/non-existent-id-123`)
        .set('Authorization', adminToken)
        .send(blogsTestData.valid)
        .expect(HttpStatus.NotFound_404);
    });

    it('should update existing blog with correct input data', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      const updateData = {
        name: 'Updated Name',
        description: 'Updated Description',
        websiteUrl: 'https://new-link.com',
      };

      // 2. Perform the update
      await request(app)
        .put(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .set('Authorization', adminToken)
        .send(updateData)
        .expect(HttpStatus.NoContent_204);

      // 3. Verification: Fetch the blog and check if fields actually changed
      const getRes = await request(app)
        .get(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .expect(HttpStatus.Ok_200);

      expect(getRes.body).toEqual({
        id: createdBlog.id,
        ...updateData,
      });
    });

    it('should NOT update blog with incorrect data (name too long)', async () => {
      const validBlogData = blogsTestData.valid;
      const { createdBlog } = await blogsTestManager.createBlog(validBlogData);

      const res = await request(app)
        .put(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .set('Authorization', adminToken)
        .send(blogsTestData.invalid.name.tooLong)
        .expect(HttpStatus.BadRequest_400);

      expect(res.body.errorsMessages[0].field).toBe('name');

      const checkRes = await request(app).get(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`);

      expect(checkRes.body.name).toBe(validBlogData.name);
    });

    it('should NOT update blog if websiteUrl is wrong protocol', async () => {
      const validBlogData = blogsTestData.valid;
      const inValidBlogData = blogsTestData.invalid;
      const { createdBlog } = await blogsTestManager.createBlog(validBlogData);

      const res = await request(app)
        .put(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .set('Authorization', adminToken)
        .send(inValidBlogData.websiteUrl.wrongPattern)
        .expect(HttpStatus.BadRequest_400);

      expect(res.body.errorsMessages[0].field).toBe('websiteUrl');
    });
  });

  // ===========================================================================
  // GROUP: DELETE
  // ===========================================================================
  describe('DELETE Requests', () => {
    it('should NOT delete blog without authorization', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      await request(app)
        .delete(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .expect(HttpStatus.Unauthorized_401);
    });

    it('should return 404 for a blog that does not exist', async () => {
      await request(app)
        .delete(`${APP_CONFIG.PATH.BLOGS.BASE}/non-existent-id-999`)
        .set('Authorization', adminToken)
        .expect(HttpStatus.NotFound_404);
    });

    it('should delete existing blog and return 204', async () => {
      const { createdBlog } = await blogsTestManager.createBlog(blogsTestData.valid);

      await request(app)
        .delete(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .set('Authorization', adminToken)
        .expect(HttpStatus.NoContent_204);

      await request(app)
        .get(`${APP_CONFIG.PATH.BLOGS.BASE}/${createdBlog.id}`)
        .expect(HttpStatus.NotFound_404);

      await request(app).get(APP_CONFIG.PATH.BLOGS.BASE).expect(HttpStatus.Ok_200, []);
    });

    it('should only delete the targeted blog (isolation check)', async () => {
      const { createdBlog: blog1 } = await blogsTestManager.createBlog(blogsTestData.valid);
      const { createdBlog: blog2 } = await blogsTestManager.createBlog({
        ...blogsTestData.valid,
        name: 'Second Blog',
      });

      // 2. Delete only the first blog
      await request(app)
        .delete(`${APP_CONFIG.PATH.BLOGS.BASE}/${blog1.id}`)
        .set('Authorization', adminToken)
        .expect(HttpStatus.NoContent_204);

      // 3. Verification: First is gone, second remains
      const listRes = await request(app).get(APP_CONFIG.PATH.BLOGS.BASE);
      expect(listRes.body).toHaveLength(1);
      expect(listRes.body[0].id).toBe(blog2.id);
    });
  });
});
