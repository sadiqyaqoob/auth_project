import userModel from "../model/user.Model.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.user; // ✅ middleware se aayega
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: { // ✅ frontend me context ke liye
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
