
import { Schema, model } from "mongoose";


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
  }
);

regionSchema.index(
  { region: 'text', note: 'text' }
);

export const Region = model('Region', regionSchema);

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
  }
);

locationTypeSchema.index(
  { type: 'text', shortDescription: 'text'}
);

export const LocationType = model('LocationType', locationTypeSchema);

