import { Router } from "express";
import { authMeProxy, authProxy, productProxy, orderProxy, paymentProxy, notificationProxy, CartProxy } from "../config/proxy.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router()


//protected route
//access data through middleware decoded jwt (req.headers), 
router.use("/auth/me", authenticate, authMeProxy)
router.use("/products", authenticate, productProxy)
router.use("/orders",authenticate , orderProxy)
router.use("/payment",authenticate,  paymentProxy)
router.use("/notifications",authenticate,  notificationProxy)
router.use("/cart", authenticate, CartProxy)
//public route
//access data through client submitted form (req.body), 
router.use("/auth", authProxy)



export default router;