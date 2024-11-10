import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateJwtTokenAndSaveToCookie } from "../utils/generateJWT.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, username } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is alreay exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username is alreay exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      username,
    });

    if (newUser) {
      generateJwtTokenAndSaveToCookie(newUser._id, res);
      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          username: newUser.username,
          followers: newUser.followers,
          following: newUser.following,
          profileImg: newUser.profileImg,
          coverImg: newUser.coverImg,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "error in server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: " invalid email or password" });
    }
    generateJwtTokenAndSaveToCookie(user._id, res);
    return res.status(200).json({
      success: true,
      message: "login sucessfull",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {}
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({});
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
