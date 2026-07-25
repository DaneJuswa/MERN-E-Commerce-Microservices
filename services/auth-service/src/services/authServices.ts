// services/auth.service.ts

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Register
export const register = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verified: false,
    provider: "local",
  });

  // TODO:
  // Generate verification token
  // Send verification email
  // Publish Kafka UserCreated event

  return {
    message: "Registration successful",
    user,
  };
};

// Login
export const login = async ({
  email,
  password,
}: LoginInput) => {
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

// Verify Email
export const verifyEmail = async (
  token: string
) => {
  // TODO:
  // Find verification token
  // Update verified=true

  return {
    message: "Email verified",
  };
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