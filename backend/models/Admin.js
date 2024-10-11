const mongoose = require("mongoose");

const PERMISSIONS = {
  MANAGE_USERS: "manage_users",
  MANAGE_JOBS: "manage_jobs",
  MANAGE_PAYMENTS: "manage_payments",
  ISSUE_REFUNDS: "issue_refunds",
  VIEW_REPORTS: "view_reports",
};

const ROLES= {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
}

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  }, 
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.ADMIN,
  },
  permissions: {
    type: [String],
    enum: Object.values(PERMISSIONS),
    default: [],
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.index({email: 1});

module.exports = mongoose.model('Admin', adminSchema);
module.exports.PERMISSIONS = PERMISSIONS;
module.exports.ROLES = ROLES;