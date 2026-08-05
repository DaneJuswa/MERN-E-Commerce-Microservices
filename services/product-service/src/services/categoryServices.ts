import type { CreateCategoryPayload, UpdateCategoryPayload } from "../schemas/categorySchemas.js"
import { Category } from "../models/Category.js"

export const createCategory = async (payload: CreateCategoryPayload) => {
    try {
        const categoryExist = await Category.findOne({
            name: { $regex: `^${payload.name}$`, $options: "i" },
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

}


export const getCategoriesbyID = async (id: string ) => {

}

export const updateCategory = async ( ) => {

}


export const deleteCategory = async ( ) => {
    
}