import notification from "../models/notifications.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id).select("-password");
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "you can not follow/unfollow yourself" });
    }
    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "user not found" });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow User
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "user unfollowed successfully" });
    } else {
      // Follow User
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      //Send Notification
      const newNotification = new notification({
        type: "FOLLOW",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();

      res.status(200).json({ message: "user followed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await User.findById(userId).select("following");
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);
    const filterdUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filterdUsers.slice(0, 4);
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error in server" });
  }
};
