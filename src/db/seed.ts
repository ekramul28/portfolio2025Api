import config from "@/config";
import User from "@/modules/user/user.model";

const superUser = {
  name: config.super_admin_name,
  email: config.super_admin_email,
  password: config.super_admin_password,
  role: "super-admin",
};

const seedSuperAdmin = async () => {
  const existingUser = await User.findOne({ email: superUser.email });
  if (!existingUser) {
    await User.create(superUser);
    // eslint-disable-next-line no-console
    console.log("Super admin created successfully");
  } else {
    // eslint-disable-next-line no-console
    // console.log("Super admin already exists");
  }
};

export default seedSuperAdmin;
