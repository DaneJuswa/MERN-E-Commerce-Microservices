// controllers/auth.controller.ts

import { Request, Response } from "express";
import * as authService from "../services/authServices.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

import passport from "../config/passportConfig.js";




interface VerifyEmailParams {
  token: string;
}



//controller for register
export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller for manual login
export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    const token = result.accessToken

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.json({
      message: "Login successful",
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//controller for google login
export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
  }),
  async (req: Request, res: Response) => {
    try {
      const profile = req.user as { id: string; emails: { value: string }[]; displayName: string };

      const result = await authService.googleLogin({
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });

      const token = result.accessToken;

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "strict",
        maxAge: 2 * 60 * 1000, // matches "2min" expiry above
      });

      return res.redirect(`${process.env.CLIENT_URL}/`);
    } catch (error: any) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=${error.message}`);
    }
  },
];

export const facebookCallback = [
  passport.authenticate("facebook", {
    session: false, 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=facebook_auth_failed`
  }), 
  async (req: Request, res: Response) => {
    try {
      const profile = req.user as {id: string; emails: {value:string}[]; displayName: string}

      console.log(profile.displayName)
      const result = await authService.facebookLogin({
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      })

      
      const token = result.accessToken

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "strict",
        maxAge: 2 * 60 * 1000, // matches "2min" expiry above
      });

      return res.redirect(`${process.env.CLIENT_URL}/`);

    } catch (error) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=${error.message}`);
    }
  }
]



//controller for facebook
export const facebookLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.facebookLogin(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//controller for refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//controller for verifying email
export const verifyEmail = async (req: Request<VerifyEmailParams>, res: Response) => {
  const FRONTEND_URL = "http://localhost:5173";
  try {
    const result = await authService.verifyEmail(req.params.token);
    return res.redirect(`${FRONTEND_URL}/email-verified`);
  } catch (error: any) {
    console.log(error)
    return res.redirect(`${FRONTEND_URL}/login?verified=false`);
  }
};



//controller for forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const result = await authService.forgotPassword(req.body.email);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller for reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const result = await authService.resetPassword(
      req.params.token,
      req.body.password
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller for fetching user
export const getCurrentUser = async (req: Request, res: Response) => {

  const userId = req.headers["x-user-id"] as string;
  console.log("andito ngani")

  console.log(userId)
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const result = await authService.getCurrentUser(userId);

    return res.status(200).json(result);
  } catch (error: any) { 
    return res.status(401).json({
      message: error.message,
    });
  }
};