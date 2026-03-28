import { Schema, model } from 'mongoose';

const regionSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    level: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    note: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

regionSchema.index({ region: 'text', note: 'text' });

export const Region = model('Region', regionSchema);

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'LocationType',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

locationSchema.index({ name: 'text', description: 'text' });

export const Location = model('Location', locationSchema);

const locationTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

locationTypeSchema.index({ type: 'text', shortDescription: 'text' });

export const LocationType = model('LocationType', locationTypeSchema);
