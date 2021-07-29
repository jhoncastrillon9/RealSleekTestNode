
import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      index: true,
    },

    address: String,
    nit: String,
    telephone: String,
    cellphone: String,
    logoImgUrl: String,
    active:Boolean,
    email: String,

  },
  {
    versionKey: false,
    timestamps: true
  },
);

export default mongoose.model('Company', CompanySchema);