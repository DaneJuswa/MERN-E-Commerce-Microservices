// models/User.ts
import { Schema, model, Document, HydratedDocument } from "mongoose";

export type AuthProvider = "local" | "google" | "facebook";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string; //OPTIONAL FOR OAUTH USER
  provider: AuthProvider;
  googleId?: string;
  facebookId?: string;
  verified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      // Required only for local accounts; google/facebook users won't have one
       required: function (this: HydratedDocument<IUser>) {
        return this.provider === "local";
      },
      select: false, // never return password by default in queries
    },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
      required: true,
    },
    googleId: { //for google login
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: { //for facebook login
      type: String,
      unique: true,
      sparse: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpires: {
      type: Date,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for lookups by provider (e.g. finding all google users)
userSchema.index({ provider: 1 });

const User = model<IUser>("User", userSchema);

export default User;