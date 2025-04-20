import { Provide, Inject, Controller, Post, Body, Get, Put, Query, Param } from '@midwayjs/core';
import { ReservationService } from '../../service/reservation/ReservationService';
import { CreateReservationDTO, QueryReservationDTO, UpdateReservationDTO } from '../../dto/reservation';
import { RuleType, Valid } from '@midwayjs/validate';
import { ResponseService } from '../../service/common/ResponseService';


@Provide()
@Controller('/api')
export class ReservationController {
  @Inject()
  reservationService: ReservationService;

  @Inject()
  responseService: ResponseService

  @Post('/reservation')
  async create(@Body() params: CreateReservationDTO) {
    const result =  await this.reservationService.createReservation(params);
    return this.responseService.success(result)
  }

  @Put('/reservation/:_id')
  async update(@Valid(RuleType.string().required()) @Param('_id') _id: string , @Body() params: UpdateReservationDTO) {
    const result = await this.reservationService.updateReservation(_id, params);
    return this.responseService.success(result)
  }

  @Get('/reservation')
  async list(@Query() params: QueryReservationDTO) {
    const result = await this.reservationService.listByDateAndStatus(params);
    console.log(result);
    
    return this.responseService.success(result)
  }
}
