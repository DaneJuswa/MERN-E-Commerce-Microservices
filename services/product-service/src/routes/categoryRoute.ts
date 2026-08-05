import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js"


const route = Router()


//create a category
route.post("/", categoryController.createCategory)

//get category
route.get("/", categoryController.getCategories)

//get category by ID
route.get("/:id", categoryController.getCategoriesByID)


export default route