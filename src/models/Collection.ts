import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  id: string;
  name: string;
  description: string;
  image: string;
  perfumeCount: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  perfumeCount: { type: Number, default: 0 },
  notes: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
