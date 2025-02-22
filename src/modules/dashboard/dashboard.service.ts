import Project from "../project/project.model";
import Blog from "../blog/blog.model";
import Category from "../category/category.model";
import Skill from "../skill/skill.model";

const getOverview = async () => {
  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalSkills = await Skill.countDocuments();

  return {
    totalProjects,
    totalBlogs,
    totalCategories,
    totalSkills,
  };
};

export default {
  getOverview,
};
