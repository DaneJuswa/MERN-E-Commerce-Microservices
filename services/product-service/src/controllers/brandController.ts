import type { Request, Response } from "express"; 
import * as brandServices from "../services/brandServices.js"

//create a brand
export const createBrand = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const brand = await brandServices.createBrand(payload);
        
        return res.status(200).json({ success: true, data: brand });

    } catch (error) {
        console.log("Error creating brand")
        return res.status(500).json({ success: false, message: "Failed to create brand" });
    }
}

//get all brands
export const getAllBrands = async (req: Request, res: Response ) => {
    try {
        const brands = await brandServices.getBrands()
        res.status(201).json({data: brands})
    } catch (error) {
        console.log(error)
    }
}

//get specific brand
export const getBrand = async (req: Request<{id: string}>, res: Response ) => {
    try {
        const {id} = req.params

        if(!id){
            throw new Error("id not found");
        }

        const foundBrand = await brandServices.getBrandByID(id)

        res.status(201).json({status: "success", data: foundBrand}) 
    } catch (error) {
        console.log(error)
    }
}

//update a brand
export const updateBrand = () => {

}

//delete a brand
export const deleteBrand = ( ) => {

}