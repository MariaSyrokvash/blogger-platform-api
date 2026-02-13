import { db } from '../../../db';
import { OutputPostType } from '../../../core/types/posts';
import { PostInputModel } from '../models/UpdateInputModel';

export const postsRepository = {
  findAll(): OutputPostType[] {
    return db.posts;
  },

  findById(id: string): OutputPostType | null {
    return db.posts.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },

  create(post: OutputPostType): OutputPostType {
    db.posts.push(post);
    return post;
  },

  update(id: string, updatedPost: PostInputModel): boolean {
    const post = db.posts.find((d) => d.id === id);

    if (!post) {
      return false;
    }

    post.title = updatedPost.title;
    post.shortDescription = updatedPost.shortDescription;
    post.content = updatedPost.content;

    return true;
  },
  delete(id: string): boolean {
    const postIndex = db.posts.findIndex((d) => d.id === id);
    if (postIndex === -1) {
      return false;
    }

    db.posts.splice(postIndex, 1);
    return true;
  },
};
