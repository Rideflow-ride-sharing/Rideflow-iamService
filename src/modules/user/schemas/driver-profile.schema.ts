import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DriverProfileDocument = DriverProfile & Document;

@Schema({ timestamps: true })
export class DriverProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  vehicleType: string; // car, bike, auto

  @Prop({ required: true })
  vehicleNumber: string;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ type: Date, required: true })
  licenseExpiry: Date;

  @Prop({ required: true })
  aadharNumber: string;

  @Prop({ required: true })
  panNumber: string;

  @Prop({ default: false })
  verifiedByAdmin: boolean;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  })
  currentLocation: { lat: number; lng: number } | null;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: Number, default: 0 })
  totalTrips: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const DriverProfileSchema = SchemaFactory.createForClass(DriverProfile);

