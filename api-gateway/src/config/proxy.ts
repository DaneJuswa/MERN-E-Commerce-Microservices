import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE!,
    changeOrigin: true
}) 

export const orderProxy = createProxyMiddleware({
    target: process.env.ORDER_SERVICE!,
    changeOrigin: true
})

export const productProxy = createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE!,
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


