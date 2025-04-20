import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { LoginDTO } from "../../dto/account";
import { BusinessError, BusinessErrorEnum, FailType, FailReason } from "../../error/BusinessError";
import { JwtService } from "@midwayjs/jwt";
import { ILogger } from "@midwayjs/logger";
// import { Sequelize } from "sequelize-typescript";
// import { InjectDataSource } from "@midwayjs/sequelize";
import { Account } from "../../entity/mongo/account";
import { InjectEntityModel } from "@midwayjs/typegoose";
import { ReturnModelType } from "@typegoose/typegoose";



/**
 * 账户服务层
 * @author lihang.wang
 * @date 2024.12.11
 */
@Provide()
export class AccountService{

    @Inject()
    ctx: Context

    @Inject()
    jwtService: JwtService;

    @Inject()
    logger: ILogger

    @InjectEntityModel(Account)
    accountModel: ReturnModelType<typeof Account>;

    /**
     * 用户登录业务处理
     * 
     * @param {LoginDTO} params 参数
     * @return
     * @memberof AccountService
     */
    async login(params: LoginDTO):Promise<any>{
        const { email, password } = params
      
        const account = await this.accountModel.findOne({
            email, password
        });
       
        if(!account){
           throw new BusinessError(BusinessErrorEnum.NOT_FOUND,`${FailType.LOGIN_FAILED}${FailReason.INCORRECT_USER_NAME_OR_PASSWORD}`)
        }
        // console.log(account);
        
        const token = await this.jwtService.sign({_id: account._id.toString()})
        
        return { token }
    }

    /**
     * 获取用户信息
     * @return
     * @memberof AccountService
   */
    async me(){
        return this.ctx.account
    }

 /**
     * 初始化数据 模拟微信账号密码
     * 
     * @return
     * @memberof AccountService
    */
 async initDataInDB(): Promise<any>{
    // 开启事务
    const session = await this.accountModel.db.startSession();
    session.startTransaction();
    try{
        const count = await this.accountModel.find().count()
        console.log('开始初始化数据,count',count);
        
        if(count<=0){
            // 初始化酒店管理人员账号
            await this.accountModel.create({
                guestName:"wanglihang",
                password: "123456",
                phone: "18830447300",
                email: "wanglihang@vx.com",
                createdAt: "2025-04-19",
                role: "staff",
                session
            })
             // 初始化3个微信账号，模拟微信Oauth账号，未来账号信息来自微信登录
            await this.accountModel.create({
                guestName:"weixin1",
                password: "123456",
                phone: "18830447301",
                email: "weixin1@vx.com",
                createdAt: "2025-04-20",
                session
            })
            await this.accountModel.create({
                guestName:"weixin2",
                password: "123456",
                phone: "18830447302",
                email: "weixin2@vx.com",
                createdAt: "2025-04-20",
                session
            })
            await this.accountModel.create({
                guestName:"weixin3",
                password: "123456",
                phone: "18830447303",
                email: "weixin3@vx.com",
                createdAt: "2025-04-20",
                session
            })
        }
        await session.commitTransaction();
        session.endSession();
        return true;
    } catch(error){
        await session.abortTransaction();
        session.endSession();
        this.logger.error(error)
        throw{
            message: 'Init data error'
        }
    }
}
}