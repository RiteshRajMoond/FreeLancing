const { ROLES } = require("../models/Admin");

const checkSuperAdmin = (req, res, next) => {
  if (req.role === ROLES.SUPERADMIN) next();
  else res.status(403).json({ message: "Forbidden" });
};

module.exports = checkSuperAdmin;
