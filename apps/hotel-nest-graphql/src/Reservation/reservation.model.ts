
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  _id: string;

  @Field()
  guestName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  arrivalTime: string;

  @Field(() => Int)
  tableSize: number;

  @Field()
  status: string;

  @Field()
  createdAt: string;
} 