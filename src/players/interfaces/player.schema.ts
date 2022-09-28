import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    profilePic: String,
    ranking: String,
    rankingPosition: Number,
  },
  { timestamps: true, collection: 'players' },
);
