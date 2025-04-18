import { Controller, Get, Inject } from "@midwayjs/core";
import { ResponseService } from "../../service/common/ResponseService";
import { TopicService } from "../../service/topic/TopicService";

/**
 * Topic控制器
 * @author lihang.wang
 * @date 2024.12.11
 */
@Controller('/api')
export class TopicController{
    @Inject()
    responseService: ResponseService
    @Inject()
    topicService: TopicService


    /**
     * 获取不重复的topic,并保存
     * 
     * @return
     * @memberof TopicController
     */

   @Get('/topic')
   async topic(){
    const result = await this.topicService.createTopic()
    return this.responseService.success(result)
   }

}