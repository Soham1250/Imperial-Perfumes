import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  phone?: string;
  addresses: IAddress[];
  orders: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' }
});

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  addresses: [AddressSchema],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
