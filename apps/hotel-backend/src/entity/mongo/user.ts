import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true })
  guestName: string;

  @prop({ required: true, unique: true })
  phone: string;

  @prop({ enum: ['guest', 'staff'], default: 'guest' })
  role: string;
}
