import { EmailTransporter } from "../config/verification.js";

export const SendVerification = async (email:string, token: string) => {
    const verificationLink = `http://localhost:4000/api/auth/verify-email/${token}`;
    try {
        await EmailTransporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Verify your email",
            html: `
            <h2>Verify your account</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">
                Verify Email
            </a>
            `,
        })
    } catch (error) {
        console.log(error)
    }
    
}