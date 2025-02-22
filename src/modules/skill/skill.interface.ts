import { Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  description: string;
  icon: string;
}
