const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const InviteToken = require("../models/InviteToken");
const Admin = require("../models/Admin");

const { ROLES } = require("../models/Admin");

exports.generateInvite = async (req, res, next) => {
  try {
    const { email, permissions } = req.body;
    const token = crypto.randomBytes(20).toString("hex");

    // create JWT with permissions
    const invitePayload = { token, permissions };
    const inviteJWT = jwt.sign(invitePayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // save token to database
    const inviteToken = new InviteToken({ token });
    await inviteToken.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER, // Brevo SMTP server
      port: process.env.SMTP_PORT, // Brevo SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_USERNAME, // Brevo SMTP username
        pass: process.env.BREVO_PASSWORD, // Brevo SMTP password
      },
    });
    
    const mailOptions = {
      from: process.env.BREVO_USERNAME,
      to: email,
      subject: "Admin Invite",
      text: `You have been invited to join as an admin. Use this token: ${inviteJWT}`,
    };
    
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ messages: errors.array() });

    const { username, email, password, inviteJWT } = req.body;

    // decode jwt for token and permissions
    const decoded = jwt.verify(inviteJWT, process.env.JWT_SECRET);
    const { token, permissions } = decoded;

    // validate invite token
    const inviteToken = await InviteToken.findOne({ token });
    if (!inviteToken) return res.status(400).json({ message: "Invalid token" });

    // create admin
    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      permissions,
      role: ROLES.ADMIN,
    });

    await newAdmin.save();

    // delete used invite token
    await inviteToken.deleteOne({ token });

    // JWT token for new admin
    const jwtToken = jwt.sign(
      {
        adminId: newAdmin._id,
        permissions: newAdmin.permissions,
        role: newAdmin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Setting Up Cookie
    res.cookie("adminJWT", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      path: "/",
      sameSite: "strict",
      signed: true,
    });

    // send response with token and permissions
    res.status(201).json({ permissions: newAdmin.permissions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ messages: errors.array() });

    // Get data from req
    const { email, password } = req.body;
    // get admin
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    // remove any previos cookies
    res.clearCookie("adminJWT", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      signed: true,
    });

    // Setting Up JWT
    const jwtToken = jwt.sign(
      {
        adminId: admin._id,
        permissions: admin.permissions,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Setting Up cookie
    res.cookie("adminJWT", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      path: "/",
      sameSite: "strict",
      signed: true,
    });

    return res.status(201).json({ permissions: admin.permissions });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.signedCookies.adminJWT;
    if (!token) return res.status(401).json({ message: "Not Authorized" });

    res.clearCookie("adminJWT", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      signed: true,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
