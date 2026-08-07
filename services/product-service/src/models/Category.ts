import mongoose, {Schema, Document, mongo} from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    image?: string;

    createdAt:Date;
    updatedAt:Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name:{
            type: String,
            required: [true, "Category is required"],
            unique: true,
            trim: true,
            maxLength: 100
        },
        description:{
            type: String, 
            required: true
        },
        image: {
            type: String
        },
        
    },
    {
            timestamps: true,
        }
)
// Prevent duplicate category names
// CategorySchema.index({name: 1})


export const Category = mongoose.model<ICategory>("Category", CategorySchema)