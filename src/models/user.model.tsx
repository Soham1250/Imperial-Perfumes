// import mongoose from 'mongoose';
// const { Schema } = mongoose;
// // import { hashPassword, comparePassword } from '../utils/auth.js';

// /**
//  * Address schema
//  */
// const addressSchema = new Schema({
//   street: {
//     type: String,
//     required: [true, 'Street address is required'],
//     trim: true
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required'],
//     trim: true
//   },
//   state: {
//     type: String,
//     required: [true, 'State is required'],
//     trim: true
//   },
//   pincode: {
//     type: String,
//     required: [true, 'Pincode is required'],
//     trim: true,
//     match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
//   },
//   country: {
//     type: String,
//     default: 'India',
//     trim: true
//   },
//   isDefault: {
//     type: Boolean,
//     default: false
//   }
// }, { _id: true });

// /**
//  * User schema
//  */
// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [8, 'Password must be at least 8 characters long'],
//     select: false // Don't include password in query results by default
//   },
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   phone: {
//     type: String,
//     trim: true,
//     match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
//   },
//   addresses: [addressSchema],
//   role: {
//     type: String,
//     enum: ['customer', 'admin'],
//     default: 'customer'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   verificationToken: String,
//   resetPasswordToken: String,
//   resetPasswordExpire: Date
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Virtual for orders
// userSchema.virtual('orders', {
//   ref: 'Order',
//   localField: '_id',
//   foreignField: 'user'
// });

// // Indexes for better query performance
// userSchema.index({ role: 1 });
// // Removed duplicate email index since it's already defined in the schema with unique: true

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     // Use the shared hashPassword utility
//     this.password = hashPassword(this.password);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   // Use the shared comparePassword utility
//   return comparePassword(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// export default User;
