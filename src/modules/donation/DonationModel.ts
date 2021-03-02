import mongoose, { Document, Model } from 'mongoose';

export const DONATION_STATUS = {
  OPEN: 'OPEN',
  PAIED: 'PAIED',
};

const Schema = new mongoose.Schema(
  {
    value: {
      type: Number,
      description: 'value of this charge in cents',
    },
    comment: {
      type: String,
      description: 'comments about this charge',
      index: true,
      trim: true,
    },
    status: {
      type: String,
      default: DONATION_STATUS.OPEN,
      enum: Object.values(DONATION_STATUS),
      index: true,
      description: 'The status of this charge',
    },
    brCode: {
      type: String,
      description: 'brcode of this donation',
    },
  },
  {
    collection: 'Donation',
    timestamps: true,
  },
);

export interface IDonation extends Document {
  value: number;
  comment: string;
  status: string;
  brCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationModel: Model<IDonation> = mongoose.model('Donation', Schema);

export default DonationModel;
