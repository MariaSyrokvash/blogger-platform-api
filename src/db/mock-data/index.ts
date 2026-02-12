import {OutputBlogType} from "../../core/types/blogs";
import {OutputPostType} from "../../core/types/posts";

export const blogMocks: OutputBlogType[] = [
  {
    id: "blog-1",
    name: "IT-Incubator",
    description: "Programming and education blog",
    websiteUrl: "https://it-incubator.io"
  },
  {
    id: "blog-2",
    name: "Backend News",
    description: "All about Node.js and Express",
    websiteUrl: "https://backend-news.com"
  }
];

export const postMocks: OutputPostType[] = [
  {
    id: "1",
    title: "Express Tips",
    shortDescription: "How to use express-validator",
    content: "Detailed guide about input validation...",
    blogId: "blog-1",
    blogName: "IT-Incubator"
  },
  {
    id: "2",
    title: "TypeScript 5.0",
    shortDescription: "New features in TS",
    content: "Overview of the latest decorators and performance...",
    blogId: "blog-2",
    blogName: "Backend News"
  }
];
