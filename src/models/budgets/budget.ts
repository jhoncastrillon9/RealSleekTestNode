import { Schema, model } from 'mongoose';

const BudgetSchema = new Schema(
    {
        budgetName: {
            type: String,
            index: true,
        },
        grossTotal: Number,
        iva: Number,
        ivaPercentage: Number,
        discount: Number,
        total: Number,
        observation: String,
        companyId: String,
        details: [{
            ref: "BudgetDetail",
            type: Schema.Types.ObjectId
          }],
    },
    {
        versionKey: false,
        timestamps: true
    },
);

export default model('Budget', BudgetSchema);