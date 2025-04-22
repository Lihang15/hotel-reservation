import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('Test ReservationController', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should create a reservation', async () => {
    const loginRes = await createHttpRequest(app)
    .post('/api/login')
    .send({ email: 'weixin1@vx.com', password: '123456' });

  const token = loginRes.body.data.token;

  const response = await createHttpRequest(app)
    .post('/api/reservation')
    .send({
      arrivalTime: '2025-09-08',
      tableSize: 4,
    })
    .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id');
  });

  it('Lack of attributes', async () => {
    const loginRes = await createHttpRequest(app)
      .post('/api/login')
      .send({ email: 'weixin1@vx.com', password: '123456' });
  
    const token = loginRes.body.data.token;
  
    const response = await createHttpRequest(app)
      .post('/api/reservation')
      .send({
        arrivalTime: '2025-09-08',
      })
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toBe(400); // 400 表示验证失败
  });

  it('Lack of attributes', async () => {
    const loginRes = await createHttpRequest(app)
      .post('/api/login')
      .send({ email: 'weixin1@vx.com', password: '123456' });
  
    const token = loginRes.body.data.token;
  
    const response = await createHttpRequest(app)
      .post('/api/reservation')
      .send({
          tableSize: 4,
      })
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toBe(400); // 400 表示验证失败
  });

  // it('should update a reservation', async () => {
  //   // 先创建一个，再更新
  //   const createRes = await createHttpRequest(app)
  //     .post('/api/reservation')
  //     .send({
  //       arrivalTime: new Date(),
  //       tableSize: 2,
  //       status: 'pending'
  //     });

  //   const reservationId = createRes.body.data._id;

  //   const updateRes = await createHttpRequest(app)
  //     .put(`/api/reservation/${reservationId}`)
  //     .send({
  //       tableSize: 6,
  //       status: 'approved'
  //     });

  //   expect(updateRes.status).toBe(200);
  //   expect(updateRes.body.success).toBe(true);
  //   expect(updateRes.body.data.tableSize).toBe(6);
  // });

  // it('should list reservations', async () => {
  //   const listRes = await createHttpRequest(app)
  //     .get('/api/reservation')
  //     .query({
  //       current: 1,
  //       pageSize: 5
  //     });

  //   expect(listRes.status).toBe(200);
  //   expect(listRes.body.success).toBe(true);
  //   expect(Array.isArray(listRes.body.data.rows)).toBe(true);
  // });
});
