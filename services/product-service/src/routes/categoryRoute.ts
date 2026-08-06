import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js"
import { validate } from "../middleware/validatePayload.js";
import { createCategorySchema } from "../schemas/categorySchemas.js";

const route = Router()


//create a category
route.post("/" , validate(createCategorySchema),  categoryController.createCategory)

//get category
route.get("/", categoryController.getCategories)

//get category by ID
route.get("/:id", categoryController.getCategoriesByID)


export default route