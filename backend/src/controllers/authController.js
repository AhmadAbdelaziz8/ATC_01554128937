import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
// generate JWT
const generateToken = (userId, userRole) => {
  const secret = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d"; // Default to 1 day

  if (!secret) {
    throw new Error(
      "JWT Secret not found. Set JWT_SECRET_KEY environment variable."
    );
  }

  return jwt.sign(
    { id: userId, role: userRole }, // Payload: include user ID and role
    secret,
    { expiresIn: expiresIn }
  );
};

//Registration Controller 
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    // 2. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }, // Store emails consistently (lowercase)
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." }); // 409 Conflict
    }

    // create password hash and user
    const salt = await bcrypt.genSalt(10); // Generate salt (10 rounds is generally good)
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        fullName, 
        email: email.toLowerCase(),
        passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during registration." });
  }
};

// Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." }); // Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." }); // Unauthorized
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login." });
  }
};
