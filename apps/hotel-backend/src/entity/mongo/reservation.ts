import { prop, Ref } from '@typegoose/typegoose';
import { Account } from './account';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class Reservation {
  @prop({ ref: () => Account, required: true })
  userId: Ref<Account>;
  
  @prop({ required: true })
  arrivalTime: Date;

  @prop({ required: true })
  tableSize: number;

  @prop({ enum: ['pending', 'approved', 'cancelled', 'completed'], default: 'pending' })
  status: string;

  @prop()
  createdAt: string
}
