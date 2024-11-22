import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token if password is correct
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Debugging logs to check the received data
  console.log("Received Data:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields (username, email, password) are required",
    });
  }

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPwd,
    });

    // Save user to DB
    const user = await newUser.save();

    // Generate JWT token
    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export { login, registerUser };
