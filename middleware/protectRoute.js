import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Extract the token by splitting the header
		const token = authHeader.split(' ')[1]; // This gets the actual token

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
const  id = decoded?.sub


		// Fetch the user based on the userId from the decoded token
		const user = await User.findById({_id:id}).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach the user information to the request object for use in the next middleware or route
		req.user = user;

		// Call next() to continue to the next middleware or route handler
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;