const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');
const { ROLES, PERMISSIONS } = require('./models/Admin');

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 12);

    const superAdmin = new Admin({
      username: process.env.SUPER_ADMIN_USERNAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: ROLES.SUPERADMIN,
      permissions: Object.values(PERMISSIONS),
    });

    await superAdmin.save();
    console.log('Super Admin created successfully');
  } catch (error) {
    console.error('Error creating Super Admin:', error);
  } finally {
    mongoose.disconnect();
  }
};

createSuperAdmin();