import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRegisterDate = (schema: ZodSchema) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues[0].message,
                errors: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
                })),
            });
        }

        req.body = result.data
        next()
    }
}