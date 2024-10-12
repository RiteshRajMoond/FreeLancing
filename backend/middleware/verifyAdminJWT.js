const jwt = require("jsonwebtoken");

const verifyAdminJWT = (req, res, next) => {
    const token = req.signedCookies.adminJWT;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ message: "Unauthorized" });
        req.adminId = decoded.adminId;
        req.permissions = decoded.permissions;
        req.role = decoded.role;
        next();
    })
}

module.exports = verifyAdminJWT;