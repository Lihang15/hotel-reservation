import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.model';

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [
    { _id: '1', guestName: 'Alice', email: 'alice@test.com',createdAt: '',status:'',phone:'',arrivalTime:'',tableSize:1 },
    { _id: '2', guestName: 'lihang', email: 'alice@test.com',createdAt: '',status:'',phone:'',arrivalTime:'',tableSize:1 },
  ];

  findAll(): Reservation[] {
    return this.reservations;
  }

  findById(_id: string): Reservation | undefined {
    return this.reservations.find(u => u._id === _id);
  }
}
