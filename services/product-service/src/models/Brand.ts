import mongoose, {Schema, Document} from "mongoose";

export interface IBrand extends Document{
    name: string;
    description?: string;
    logo? : string;

    createdAt:Date;
    updatedAt: Date;
}



const BrandSchema = new Schema<IBrand>(
    {
        name: {
            type: String,
            required: [true, "Brand is required"],
            unique: true,
            trim: true,
            maxLength: 100,

        },
        description:{
            type: String,
            trim: true
        },
        logo: {
            type: String,

        }
    },
    {
        timestamps: true,
    }
)

BrandSchema.index({name: 1});

export const Brand = mongoose.model<IBrand>("Brand", BrandSchema)