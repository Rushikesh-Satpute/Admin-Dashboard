import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  mobile: string;
  role: string;
  isActive: boolean;
  avatarUrl: string;
  createdAt?: Date; // Optional, automatically handled by mongoose
  updatedAt?: Date; // Optional, automatically handled by mongoose
}

// Define the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [250, 'Bio cannot exceed 250 characters'],
      default: '',
    },
    mobile: {
      type: String,
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        'Please enter a valid 10-digit mobile number',
      ],
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true, // Field to indicate if the account is active
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: '', // Optional field for storing profile picture URL
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const User = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

export default User;