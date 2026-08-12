import {
    createProxyMiddleware,
    fixRequestBody
} from "http-proxy-middleware";
import dotenv from "dotenv"
dotenv.config()

//shared
const forwardUserHeaders = (proxyReq: any, req: any) => {
    if (req.headers["x-user-id"]) {
        proxyReq.setHeader("x-user-id", req.headers["x-user-id"] as string);
    }
    if (req.headers["x-user-email"]) {
        proxyReq.setHeader("x-user-email", req.headers["x-user-email"] as string);
    }
    fixRequestBody(proxyReq, req);
};

// Public auth routes (register, login, etc.) — req.url still has a segment after "/auth"
export const authProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE!,
    changeOrigin: true,
    pathRewrite: {
        "^/": "/api/auth/"
    },
    on: {
        proxyReq: forwardUserHeaders
    }
});

// pathRewrite needs the full target path hardcoded, not reconstructed from req.url
export const authMeProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE!,
    changeOrigin: true,
    pathRewrite: {
        "^/": "/api/auth/me"
    },
    on: {
        proxyReq: forwardUserHeaders
    }
});


//PRODUCTS 
export const productProxy = createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE!,
    changeOrigin: true,
    pathRewrite: {
        "^/": "/api/products/"
    }
})


export const CartProxy = createProxyMiddleware({
    target: process.env.CART_SERVICE!,
    changeOrigin: true,

    pathRewrite: {
        "^/": "/api/cart/",
    },

    on: {
       proxyReq: forwardUserHeaders
    },
});



export const orderProxy = createProxyMiddleware({
    target: process.env.ORDER_SERVICE!,
    changeOrigin: true
})



export const paymentProxy = createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE!,
    changeOrigin: true
})

export const notificationProxy = createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE!,
    changeOrigin: true
})


