import type { Request, Response } from "express";
import { createCategorySchema } from "../schemas/categorySchemas.js";
import * as cServices from "../services/categoryServices.js"
import { ZodError } from "zod";


//POST category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const category = cServices.createCategory(payload)

        return res.status(201).json({ success: true, data: category })
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, errors: error.flatten() });
        }

        if (error instanceof Error && error.message === "Category already exists") {
            return res.status(409).json({ success: false, message: error.message });
        }

        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to create category" });
    }
}

//GET categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await cServices.getCategories()

        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to fetch categories" });
    }
}


//GET categories by ID
export const getCategoriesByID = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "ID is required"
            });
        }

        const category = await cServices.getCategoriesbyID(id)
    } catch (error) {

    }
}