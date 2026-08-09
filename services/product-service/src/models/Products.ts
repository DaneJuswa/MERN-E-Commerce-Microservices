import mongoose, { Schema, Document, Types } from "mongoose";
// Variant
interface IVariant {
    sku: string;
    attributes: Record<string, string>;
    price: number;
    stock: number;
    images?: string[];
}

const VariantSchema = new Schema<IVariant>(
    {
        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        attributes: {
            type: Map,
            of: String,
            default: {},
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        images: [{ type: String }],
    },
    {
    }
);

// Product

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    sku: string;
    category: Types.ObjectId;
    brand: Types.ObjectId;
    tags: string[];
    images: string[];
    stock: number;
    isActive: boolean;
    hasVariants: boolean;
    variants: IVariant[];
    ratingsAverage: number;
    ratingsCount: number;
    // Auth Service User ID
    sellerID: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: 200,
        },

        slug: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
            default: function (this: IProduct) {
                return this.name
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
            },
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },

        currency: {
            type: String,
            default: "PHP",
            uppercase: true,
            minlength: 3,
            maxlength: 3,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },

        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brands",
            required: true,
            index: true,
        },

        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],

        images: [
            {
                type: String,
            },
        ],

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        hasVariants: {
            type: Boolean,
            default: false,
        },

        variants: {
            type: [VariantSchema],
            default: [],
        },

        ratingsAverage: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
            set: (val: number) => Math.round(val * 10) / 10,
        },
        ratingsCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        // Comes from API Gateway (x-user-id)
        sellerID: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

// Indexes

ProductSchema.index({
    name: "text",
    description: "text",
    tags: "text",
});

ProductSchema.index({
    category: 1,
    brand: 1,
    isActive: 1,
});

ProductSchema.index({
    price: 1,
});

//Virtuals

ProductSchema.virtual("inStock").get(function (this: IProduct) {
    return this.hasVariants
        ? this.variants.some((variant) => variant.stock > 0)
        : this.stock > 0;
});

//Middleware

ProductSchema.pre("save", function () {
    if (this.isModified("name") && !this.isModified("slug")) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
});

export const Product = mongoose.model<IProduct>(
    "Product",
    ProductSchema
);