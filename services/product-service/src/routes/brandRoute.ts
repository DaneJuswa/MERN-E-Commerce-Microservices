import { Router } from "express";
import * as controller from "../controllers/categoryController.js"
import { validate } from "../middleware/validatePayload.js";
import{ createBrandSchema, updateBrandSchema } from "../schemas/brandSchemas.js";
import * as brandController from "../controllers/brandController.js"
const route = Router()


//create a brand
route.post("/", validate(createBrandSchema), brandController.createBrand  )

//get brands
route.get("/", brandController.getAllBrands)

//get specific brand
route.get("/:id", brandController.getBrand)

//update a brand
route.patch("/:id", validate(updateBrandSchema) ,brandController.updateBrand)

route.delete("/:id", brandController.deleteBrand)

export default route