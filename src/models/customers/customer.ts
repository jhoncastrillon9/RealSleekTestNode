
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      index: true,
    },

    typeDocument:String,
    numberDocument: String,
    address: String,
    cellphone: String,
    email: String,  
    companyId: String    
  },
  {
    versionKey: false,
    timestamps: true
  },
);

export default mongoose.model('Customer', CustomerSchema);