import {db} from "../../../db";
import {OutputPostType} from "../../../core/types/posts";
import {PostInputModel} from "../models/UpdateInputModel";

const dbPosts = db.posts;

export const postsRepository = {
  findAll(): OutputPostType[] {
    return dbPosts;
  },

  findById(id: string): OutputPostType | null {
    return dbPosts.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },

  create(post: OutputPostType): OutputPostType {
    dbPosts.push(post);
    return post;
  },

  update(id: string, updatedPost: PostInputModel): boolean {
    const post = dbPosts.find((d) => d.id === id);

    if (!post) {
      return false;
    }

    post.title = updatedPost.title;
    post.shortDescription = updatedPost.shortDescription;
    post.content = updatedPost.content;

    return true;
  },
  delete(id: string): boolean {
    const postIndex = dbPosts.findIndex((d) => d.id === id);

    if (postIndex === -1) {
      return false;
    }

    dbPosts.splice(postIndex, 1);
    return true;
  }
};
