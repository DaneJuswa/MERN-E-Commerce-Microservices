import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
    _id: Types.ObjectId;
    productID: string;
    variantID: string;
    quantity: number
}

export interface ICart extends Document {
    userID: string;
    items: ICartItem[]
    createdAt: Date;
    updatedAt: Date;
}


const cartItemSchema = new Schema<ICartItem>({
    productID: {
        type: String,
        required: true
    },
    variantID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }

})

    const cartSchema = new Schema<ICart>({
        userID: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        items: {
            type: [cartItemSchema],
            default: []
        }
    }, {
        timestamps:true
    }
    )

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart