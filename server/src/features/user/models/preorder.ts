import mongoose, { Schema, model } from "mongoose";

interface Preorder {
  user_id: mongoose.Types.ObjectId;
  order_details_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const preorderSchema = new Schema<Preorder>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  order_details_id: {
    type: Schema.Types.ObjectId,
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

const preorder=model<Preorder>("preorder",preorderSchema);
export default preorder;
