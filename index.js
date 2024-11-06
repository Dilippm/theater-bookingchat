import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'; // Import cors
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";
dotenv.config();


const PORT = process.env.PORT || 5000;
app.use(express.json());
// Enable CORS
// Allow only the frontend domain
app.use(cors({
	origin: 'https://hogwartsseats.netlify.app',  // Replace with your frontend URL
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Define routes
app.use("/api/messages", messageRoutes);
app.use("/api/chat/users", userRoutes);

// Start the server
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
