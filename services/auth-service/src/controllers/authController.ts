// controllers/auth.controller.ts

import { Request, Response } from "express";
import * as authService from "../services/authServices.js";


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

//controller for login
export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//controller for google login
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.googleLogin(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

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


// controllers for verifying status of register
export const checkVerificationStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;


    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required." });
    }

    const result = await authService.checkVerificationStatus(email);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
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
  try {
    const result = await authService.getCurrentUser(req);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};