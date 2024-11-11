import notification from "../models/notifications.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const Notifications = await notification.find({ to: userId }).populate({
      path: "from",
      select: "user profileImg",
    });

    await notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(Notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await notification.deleteMany({ to: userId });
    res.status(200).json({ message: "notifications deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;
    const Notification = await notification.findById(notificationId);
    if (!Notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    if (Notification.to.toString() !== userId.toString()) {
      return res.status(404).json({ message: "Notification not found" });
    }
    await notification.findByIdAdnDelete(notificationId);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};
