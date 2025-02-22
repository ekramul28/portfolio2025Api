import { Document, Model, Types } from "mongoose";

export type TBlogContentType = "mdx" | "text" | "string";
export type TBlogStatus = "published" | "draft" | "unlisted" | "deleted";
export interface IBlogAuthor {
  name: string;
  email: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  brief: string;
  cover: string;
  contentType: TBlogContentType;
  author: IBlogAuthor;
  status: TBlogStatus;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  category: Types.ObjectId;
  isDeleted: boolean;
}

export interface IBlogModel extends Model<IBlog> {
  generateSlug(title: string): Promise<string>;
}
