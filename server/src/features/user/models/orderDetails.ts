import mongoose, { Schema, model } from "mongoose";

interface orderDetails {
  user_id: mongoose.Types.ObjectId;
  product_ids: mongoose.Types.ObjectId[];
  total_amount:Number
  createdAt: Date;
  updatedAt: Date;
}

const order_detailsSchema = new Schema<orderDetails>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total_amount: {
    type: Number,
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

const order_detailsModel=model<orderDetails>("order_details",order_detailsSchema);
export default order_detailsModel;
