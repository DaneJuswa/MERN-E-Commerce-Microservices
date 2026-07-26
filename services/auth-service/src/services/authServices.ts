// services/auth.service.ts

//business logic
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import crypto from "crypto"
import { SendVerification } from "./verificationService.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Register user 
export const register = async ({name, email, password,}: RegisterInput) => {
 const existingUser = await User.findOne({email})

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(
      Date.now() + 1000 * 60 * 60 * 24 // 24 hours
    );

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local",
    verified: false,
    verificationToken,
    verificationTokenExpires,
  });


  await SendVerification(
      user.email,
      verificationToken
  );

  const userResponse = user.toObject();

  delete userResponse.password;
  delete userResponse.verificationToken;
  delete userResponse.verificationTokenExpires;
  delete userResponse.resetPasswordToken;
  delete userResponse.resetPasswordExpires;

  

  return {
     message: "Registration successful. Please verify your email.",
    user: userResponse,
  };
};

// Login
export const login = async ({email, password}: LoginInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// Google Login
export const googleLogin = async (googleUser: {
  email: string;
  name: string;
}) => {
  let user = await User.findOne({
    email: googleUser.email,
  });

  if (!user) {
    user = await User.create({
      ...googleUser,
      provider: "google",
      verified: true,
    });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
    user,
  };
};

// Facebook Login
export const facebookLogin = async (facebookUser: {
  email: string;
  name: string;
}) => {
  let user = await User.findOne({
    email: facebookUser.email,
  });

  if (!user) {
    user = await User.create({
      ...facebookUser,
      provider: "facebook",
      verified: true,
    });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
    user,
  };
};

// Refresh Token
export const refresh = async (
  refreshToken: string
) => {
  const payload = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET!
  ) as {
    id: string;
  };

  const accessToken = jwt.sign(
    {
      id: payload.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
  };
};

// Verify Email Service
export const verifyEmail = async (token: string) => {
  if (!token) {
    throw new Error("Verification token is required.");
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: new Date() },
  }).select("+verificationToken +verificationTokenExpires");

  if (!user) {
    throw new Error("Invalid or expired verification token.");
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save();

  return {
    message: "Email verified successfully.",
  };
};

//for checking verififcation status
export const checkVerificationStatus = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  return { verified: user.verified };
};




// Forgot Password
export const forgotPassword = async (
  email: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // TODO:
  // Generate reset token
  // Save token
  // Send email

  return {
    message: "Password reset email sent",
  };
};

// Reset Password
export const resetPassword = async (
  token: string,
  password: string
) => {
  // TODO:
  // Verify reset token
  // Hash password
  // Save password

  return {
    message: "Password updated",
  };
};

// Get Current User
export const getCurrentUser = async (
  userId: string
) => {
  const user = await User.findById(userId)
    .select("-password");

  return user;
};