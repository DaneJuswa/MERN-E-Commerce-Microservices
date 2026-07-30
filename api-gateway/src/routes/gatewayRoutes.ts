import { Router } from "express";
import { authProxy, productProxy, orderProxy, paymentProxy, notificationProxy } from "../config/proxy.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router()

//public route
router.use("/auth", authProxy)

//protected route
router.use("/products", authenticate, productProxy)
router.use("orders",authenticate , orderProxy)
router.use("paymentProxy",authenticate,  paymentProxy)
router.use("/notifications",authenticate,  notificationProxy)

export default router;