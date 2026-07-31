// routes/authRoute.ts
import { Router } from "express";
import * as auth from "../controllers/authController.js";
import passport from "../config/passportConfig.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validateRegisterData } from "../middleware/registerMiddleware.js";
import { registerSchema } from "../schema/registerSchema.js";

const authRoute = Router();

authRoute.post("/register", validateRegisterData(registerSchema), auth.register);
authRoute.post("/login", auth.login);

// Google — redirect flow (backend talks to Google)
authRoute.get("/google", passport.authenticate("google", {scope: ["profile", "email"],session: false,}));
authRoute.get("/google/callback", auth.googleCallback);

authRoute.get("/facebook", passport.authenticate("facebook", {scope: ["email"], session: false,}))
authRoute.get("/facebook/callback", auth.facebookCallback)


// authRoute.post("/facebook", auth.facebookLogin);

authRoute.post("/refresh", auth.refreshToken);
authRoute.get("/verify-email/:token", auth.verifyEmail);
authRoute.post("/forgot-password", auth.forgotPassword);
authRoute.post("/reset-password/:token", auth.resetPassword);
authRoute.get("/me",  auth.getCurrentUser);

export default authRoute;