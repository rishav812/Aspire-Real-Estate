import { Schema, model } from "mongoose";

interface User {
  name: string;
  image?: string;
  email: string;
  phone: number;
  password: string;
  isAdmin?: boolean;
  country: string | undefined;
  is_verified: number;
  is_active: number;
  created_ts: number;
  updated_ts: number;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  is_verified: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Number,
    required: true,
  },
  created_ts: {
    type: Number,
    required: true,
  },
  updated_ts: {
    type: Number,
    required: true,
  }
});

const userModel = model<User>("user", userSchema);
export default userModel;
