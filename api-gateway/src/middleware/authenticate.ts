
import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {

    // Delete any incoming x-user-* headers to prevent spoofing
    delete req.headers["x-user-id"];
    delete req.headers["x-user-email"];
    delete req.headers["x-user-payload"];

    const token = req.cookies.token;
    console.log("test nga kung gagana")

    console.log(token)
    if(!token){
        return res.status(401).json({
            message:"Unauthorized ngani"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string; email: string;};

        req.user = decoded

        console.log(req.user)


        // ATTACH TO HEADERS so http-proxy-middleware can forward them downstream
        req.headers["x-user-id"] = decoded.id;
        req.headers["x-user-email"] = decoded.email;
        req.headers["x-user-payload"] = JSON.stringify(decoded);

        console.log(decoded.id)

        next()
    } catch{
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}