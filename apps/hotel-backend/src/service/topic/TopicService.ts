import { Provide } from '@midwayjs/core';
import { InjectDataSource } from "@midwayjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Topic } from '../../entity/postgre/topic';

@Provide()
export class TopicService {
  @InjectDataSource()
  sequelize: Sequelize;

  async createTopic(title?: string, content?: string) {
    // 从 sequence 拿一个新的 topic_id
    const [result]: any = await this.sequelize.query(`SELECT nextval('topic_id_seq')`);
    const topicId = result[0].nextval;

    // 存入数据库
    const topic = await Topic.create({
        topicId,
        title,
        content,
      });

    return {topic_id: topic.topicId}
  }
}
