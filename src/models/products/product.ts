
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      index: true,
    },

    description:String,
    category: String,
    price: Number,
    urlImg: String,
    companyId: String,
    measure:String
  },
  {
    versionKey: false,
    timestamps: true
  },
);

export default mongoose.model('Product', ProductSchema);