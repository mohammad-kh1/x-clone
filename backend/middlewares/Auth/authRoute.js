import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

export const authRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ sucess: false, message: "Unauthenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(403)
        .json({ sucess: false, message: "Unauthenticated" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(403).json({});
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
