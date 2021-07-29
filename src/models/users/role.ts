import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            index: true,
        }
    },
    {
        versionKey: false,
        timestamps: true
    },
);

export default mongoose.model('Role', RoleSchema);