import { Inject, Provide } from '@midwayjs/core';
import { Context } from "@midwayjs/koa";
import { InjectEntityModel } from '@midwayjs/typegoose';
import { Reservation } from '../../entity/mongo/reservation';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateReservationDTO, QueryReservationDTO, UpdateReservationDTO } from '../../dto/reservation';
import * as dayjs from 'dayjs';
import { Account } from '../../entity/mongo/account';

/**
 * 预定业务处理
 * @author lihang.wang
 * @date 2025-04-20
 */
@Provide()
export class ReservationService {
      @InjectEntityModel(Reservation)
      reservationModel: ReturnModelType<typeof Reservation>;

      @Inject()
      ctx: Context

  async createReservation(params: CreateReservationDTO) {
    return await this.reservationModel.create({...params, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),userId: this.ctx.account._id});
  }

  async updateReservation(_id: string, params: UpdateReservationDTO) {
    return await this.reservationModel.findByIdAndUpdate(_id, params, { new: true });
  }

 
  async listByDateAndStatus(params: QueryReservationDTO) {
    const {
      current = 1,
      pageSize = 10,
      arrivalTime,
      status
    } = params;
    
    const skip = pageSize * (current - 1);
    const condition: any = {};
    const account = this.ctx.account
    // 如果是客人，客人只能看到自己的预定
    if(account.role==='guest'){
      condition.userId = this.ctx.account._id
    }
   
    if (arrivalTime) {
      condition.arrivalTime = {
        $gte: dayjs(arrivalTime).startOf('day').toDate(),
        $lte: dayjs(arrivalTime).endOf('day').toDate(),
      };
    }

    if (status) {
      condition.status = status;
    }

    const sort: any = {
      createdAt: -1,
    };
    const count = await this.reservationModel.find(condition).count();
    const rows = await this.reservationModel
      .find(condition)
      .populate('userId') 
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
      
      const data = rows.map(item => ({
        _id: item._id,
        guestName: (item.userId as Account)?.guestName,
        email: (item.userId as Account)?.email,
        phone: (item.userId as Account)?.phone,
        arrivalTime: item.arrivalTime,
        tableSize: item.tableSize,
        status: item.status,
        createdAt: item.createdAt,
      }));
      
    return { count, rows: data, current, pageSize };
   
  }

  

}
