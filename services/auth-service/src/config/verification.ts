import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

export const EmailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS

    }
})