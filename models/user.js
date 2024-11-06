import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    userimage: {
        type: String,
        default: '', // Default value if no image is provided
    },
    reservation: {
        type: [String], // Array of strings for reservations
        default: [],    // Default to empty array
    },
    bookings: {
        type: [String], // Array of strings for bookings
        default: [],    // Default to empty array
    },
    role: {
        type: String,
        default: 'user', // Default role
    },
    wallet: {
        type: Number,
        default: 0.0, // Default wallet amount
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
