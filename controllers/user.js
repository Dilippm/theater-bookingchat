import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
			role: { $ne: 'user' } // Exclude users with role 'user'
		}).select("-password");
		

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};