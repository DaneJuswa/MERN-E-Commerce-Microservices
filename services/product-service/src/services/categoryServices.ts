import type { CreateCategoryPayload, UpdateCategoryPayload } from "../schemas/categorySchemas.js"
import { Category } from "../models/Category.js"


export const createCategory = async (payload: CreateCategoryPayload) => {
    try {
        const categoryExist = await Category.findOne({
            name: { $regex: `^${payload.category}$`, $options: "i" },
        }) 

        if(categoryExist){
            throw new Error("Category already exist")
        }

        const category = await Category.create(payload)

        return category
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getCategories = async () => {
    try {
        const brand = await Category.find()

        if(!brand){
            console.log("Cannot Get Brands")
        }

        return brand
    } catch (error) {
        console.log("Error fetching brands")
    }
}


export const getCategoriesbyID = async (id: string ) => {

}

export const updateCategory = async ( ) => {

}


export const deleteCategory = async ( ) => {
    
}