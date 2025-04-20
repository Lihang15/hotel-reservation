import { EntityModel } from '@midwayjs/typegoose';
import { prop } from '@typegoose/typegoose';

@EntityModel()
export class Account {
  @prop({ required: true })
  guestName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, unique: true })
  phone: string;

  @prop({ required: true })
  email: string;

  @prop({ enum: ['guest', 'staff'], default: 'guest' })
  role: string;

  @prop()
  createdAt: string
}
