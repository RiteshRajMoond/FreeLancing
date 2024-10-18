const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const redisClient = require('../config/redis');

const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ messages: errors.array() });

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const userToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    redisClient.setEx(`session:${newUser._id}`, 86400, userToken);

    res.cookie("userJWT", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      signed: true,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getSessionData = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const sessionData = await redisClient.get(`session:${userId}`);
    if(!sessionData) return res.status(404).json({message: "Session not found"});
    res.status(200).json({sessionData});
  } catch (err) {
    res.status(500).json({message: "Internal server error", err});
  }
}

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ messages: errors.array() });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    res.clearCookie("userJWT", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      signed: true,
    });

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("userJWT", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      signed: true,
    });

    return res.status(201).json({ message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.signedCookies.userJWT;
    if (!token) return res.status(401).json({ message: "Not Authorized" });

    res.clearCookie("userJWT", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      signed: true,
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
