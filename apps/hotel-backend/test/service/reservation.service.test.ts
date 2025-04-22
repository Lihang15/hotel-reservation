import { Framework } from '@midwayjs/koa';
import { createApp, close } from '@midwayjs/mock';
import { ReservationService } from '../../src/service/reservation/ReservationService';
import { CreateReservationDTO } from '../../src/dto/reservation';
;

describe('Test ReservationService.createReservation', () => {
  let app: any;
  let reservationService: ReservationService;

  beforeAll(async () => {
    app = await createApp<Framework>();
    reservationService = await app.getApplicationContext().getAsync(ReservationService);
  });

  afterAll(async () => {
    await close(app);
  });

  it('should create a reservation successfully', async () => {
    // Mock ctx.account._id
    reservationService.ctx = {
      account: {
        _id: '6805a27a803a4a56d393135c'
      }
    } as any;


    const params: CreateReservationDTO = {
      arrivalTime: '2025-09-08' as any,
      tableSize: 4,
    };

    const result = await reservationService.createReservation(params);

    expect(result).toHaveProperty('_id');
    // expect(reservationService.reservationModel.create).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     arrivalTime: params.arrivalTime,
    //     tableSize: 4,
    //     userId: 'mock-user-id',
    //   })
    // );
  });
});
