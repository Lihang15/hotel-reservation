import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './user';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Reservation {
  @prop({ ref: () => User, required: true })
  userId: Ref<User>;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  arrivalTime: Date;

  @prop({ required: true })
  tableSize: number;

  @prop({ enum: ['pending', 'approved', 'cancelled', 'completed'], default: 'pending' })
  status: string;
}
