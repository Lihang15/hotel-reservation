import { Rule, RuleType } from "@midwayjs/validate"
/**
 * 用户account相关验证器
 * @author lihang.wang
 * @date 2024.12.26
 */
export class CreateReservationDTO{

    @Rule(RuleType.string().required())
    arrivalTime: Date;
  
    @Rule(RuleType.number().required())
    tableSize: number;

}

export class UpdateReservationDTO{

    @Rule(RuleType.string().valid('approved', 'cancelled', 'completed'))
    status: string;
  
    @Rule(RuleType.string())
    arrivalTime: Date;

    @Rule(RuleType.number())
    tableSize: number;

}

export class QueryReservationDTO {

    @Rule(RuleType.string().allow('',null))
    arrivalTime: string;

    @Rule(RuleType.string())
    status: string;

    @Rule(RuleType.number())
    current: number;

    @Rule(RuleType.number())
    pageSize: number;
  }
  