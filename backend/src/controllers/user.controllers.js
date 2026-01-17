import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile " });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser && existingUser._id.toString() !== req.user.userId) {
      return res.status(409).json({ message: "Username already taken!" });
    }

    const user = await User.findById(req.user.userId).select("-password");
    user.username = username;

    await user.save();

    res.json({
      message: "Profile updated!",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
