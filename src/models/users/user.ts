
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      trim: true
    },

    password: String,

    salt: String,
    cellphone: String,
    telephone: String,
    urlPhoto: String,
    companyId: String,

    roles: [{
      ref: "role",
      type: Schema.Types.ObjectId
    }],
  },
  {
    versionKey: false,
    timestamps: true
  },
);

export default model('User', userSchema);