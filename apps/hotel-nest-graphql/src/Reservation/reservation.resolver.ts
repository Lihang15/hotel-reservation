import { Resolver, Query, Args } from '@nestjs/graphql';
import { Reservation } from './reservation.model';
import { ReservationService } from './reservation.service';


@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => [Reservation])
  reservations(): Reservation[] {
    return this.reservationService.findAll();
  }

  @Query(() => Reservation, { nullable: true })
  reservation(@Args('_id') _id: string): Reservation | undefined {
    return this.reservationService.findById(_id);
  }
}
