import { Configuration, App, IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/DefaultFilter';
import { NotFoundFilter } from './filter/NotfoundFilter';
import { ReportMiddleware } from './middleware/report.middleware';
import { BusinessErrorFilter } from './filter/BusinessFilter';
import { ValidationErrorFilter } from './filter/ValidationFilter';
import * as crossDomain from '@midwayjs/cross-domain';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/auth.middleware';
import { StaticFileMiddleware } from './middleware/static.middleware';
import * as cron from '@midwayjs/cron';
import * as busboy from '@midwayjs/busboy';
import * as typegoose from '@midwayjs/typegoose';
import { AccountService } from './service/account/AccountService';
// import { AccountService } from './service/account/AccountService';


@Configuration({
  imports: [
    koa,
    validate,
    crossDomain,
    typegoose,
    jwt,
    cron,
    busboy,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;
  // @Inject()
  // accountService: AccountService

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware,StaticFileMiddleware, JwtMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter, BusinessErrorFilter, ValidationErrorFilter]);
  }

 async onServerReady(container: IMidwayContainer){
    console.log('初始化数据');
 
    const accountService = await container.getAsync(AccountService);
    await accountService.initDataInDB()
    
 }

}
