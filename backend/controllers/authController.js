const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use" });
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error logging in", error: err.message });
    }
};

// Get User
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error logging in", error: err.message });
    }
};

// Update the user's theme preference
exports.updateThemePreference = async (req, res) => {
    const { theme } = req.body;

    if (!['light', 'dark'].includes(theme)) {
        return res.status(400).json({ message: "Theme must be light or dark" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { theme },
            { new: true, runValidators: true }
        ).select("theme");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ theme: user.theme });
    } catch (err) {
        return res.status(500).json({ message: "Error updating theme preference" });
    }
};

// Update the user's profile details
exports.updateUserProfile = async (req, res) => {
    const body = req.body || {};
    const { fullName, profileImageUrl } = body;
    const hasProfileImageUrl = Object.hasOwn(body, "profileImageUrl");

    if (typeof fullName !== "string" || !fullName.trim()) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (
        hasProfileImageUrl &&
        profileImageUrl !== null &&
        typeof profileImageUrl !== "string"
    ) {
        return res.status(400).json({ message: "Profile image URL must be a string or null" });
    }

    const updates = { fullName: fullName.trim() };
    if (hasProfileImageUrl) {
        updates.profileImageUrl = profileImageUrl;
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Error updating user profile", error: err.message });
    }
};
