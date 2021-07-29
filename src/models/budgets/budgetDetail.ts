
import mongoose from 'mongoose';

const BudgetDetailSchema = new mongoose.Schema(
  {   
    budgetId:String,
    productName:String,
    description:String,
    quantity:Number,    
    price: Number,
    measure:String,
    companyId: String    
  },
  {
    versionKey: false,
    timestamps: true
  },
);

export default mongoose.model('BudgetDetail', BudgetDetailSchema);