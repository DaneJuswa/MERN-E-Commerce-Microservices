import { Router } from "express";
import * as auth from "../controllers/authController.js"
import {authenticate} from "../middleware/authMiddleware.js"
const authRoute = Router();


//pass to controller
authRoute.post("/register", auth.register);

authRoute.post("/login", auth.login);

authRoute.post("/google", auth.googleLogin);

authRoute.post("/facebook", auth.facebookLogin);

authRoute.post("/refresh", auth.refreshToken);

authRoute.get("/verify-email/:token", auth.verifyEmail);

authRoute.post("/forgot-password", auth.forgotPassword);

authRoute.post("/reset-password/:token", auth.resetPassword);

authRoute.get("/me", authenticate, auth.getCurrentUser);














export default authRoute