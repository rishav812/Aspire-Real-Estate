import mongoose, { Schema, model } from "mongoose";

interface Listing {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  address: string;
  property_type: string[];
  property_status: string;
  beds: number;
  baths: number;
  regular_price: number;
  discounted_price?: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<Listing>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  property_type: {
    type: [String],
    required: true,
  },
  property_status: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  regular_price: {
    type: Number,
    required: true,
  },
  discounted_price: {
    type: Number,
  },
  images: {
    type: [String],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const listingModel = model<Listing>(
  "listing",
  listingSchema 
);
export default listingModel;
