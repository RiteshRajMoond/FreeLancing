const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    // send email via nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Admin Invite",
      text: `You have been invited to join as an admin. Use this token: ${inviteJWT}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.signup = async (req, res, next) => {
  const { username, email, password, inviteJWT } = req.body;

  try {
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
    const jwtTOKEN = jwt.sign({adminId: newAdmin._id}, process.env.JWT_SECRET, {expiresIn: '2h'});

    // send response with token and permissions
    res.status(201).json({token: jwtTOKEN, permissions: newAdmin.permissions});


  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
