import mongoose, { Schema, Document } from 'mongoose';

// Review interface
export interface IReview {
  source: string;
  author: string;
  text: string;
  rating: number;
  date?: Date;
}

// Notes interface
export interface INotes {
  top: string[];
  middle: string[];
  base: string[];
}

// Product interface
export interface IProduct extends Document {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  image: string;
  collections: string[];
  notes: INotes;
  reviews: IReview[];
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Review schema
const ReviewSchema = new Schema<IReview>({
  source: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

// Notes schema
const NotesSchema = new Schema<INotes>({
  top: [{ type: String }],
  middle: [{ type: String }],
  base: [{ type: String }]
});

// Product schema
const ProductSchema = new Schema<IProduct>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  collections: [{ type: String }],
  notes: { type: NotesSchema, required: true },
  reviews: [{ type: ReviewSchema }],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
