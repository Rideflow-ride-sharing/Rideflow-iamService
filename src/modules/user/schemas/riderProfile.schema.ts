import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RiderProfileDocument = RiderProfile & Document;

@Schema({ timestamps: true })
export class RiderProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: String, default: null })
  defaultPaymentMethod: string | null;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  totalTrips: number;

  @Prop({ type: String, default: 'en' })
  preferredLanguage: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  })
  homeLocation: { lat: number; lng: number } | null;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  })
  workLocation: { lat: number; lng: number } | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RiderProfileSchema = SchemaFactory.createForClass(RiderProfile);

