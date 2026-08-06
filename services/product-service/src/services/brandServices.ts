import type { createBrandPayload } from "../schemas/brandSchemas.js";
import { Brand } from "../models/Brand.js";

//create a brand
export const createBrand = async (payload: createBrandPayload) => {
    try {
        const brandExist = await Brand.findOne({
            name: { $regex: `^${payload.name}$`, $options: "i" },
        })

        if(brandExist){
            throw new Error("Brand already Exist")
        }

        const brand = await Brand.create(payload)

        return brand
    } catch (error) {
        console.log(error)
    }
}

//get all brands
export const getBrands = async () => {
    try {
        const brands = await Brand.find()
    
        return brands;

    } catch (error) {
        console.log(error)
    }
}

//get brand by ID
export const getBrandByID = async (id: string) => {
    try {
        const brand = await Brand.findById(id)

        if(!brand){
            console.log("Brand does not exist")
        }

        return brand
    } catch (error) {
        console.log(error)
    }
}