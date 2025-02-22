import { TBlogContentType, TBlogStatus } from "./blog.interface";

export const BlogStatus: TBlogStatus[] = [
  "draft",
  "published",
  "unlisted",
  "deleted",
];
export const BlogContentType: TBlogContentType[] = ["mdx", "text", "string"];
export const SearchableFields = ["title", "brief", "content"];
export const DefaultFields = [
  "title",
  "brief",
  "slug",
  "cover",
  "category",
  "status",
  "author",
];

export const BLOG_STATUS = {
  PUBLISHED: "published",
  DRAFT: "draft",
  UNLISTED: "unlisted",
  DELETED: "deleted",
} as const;
