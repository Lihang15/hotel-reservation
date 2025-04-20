import { uploadWhiteList } from '@midwayjs/busboy';
import { MidwayConfig } from '@midwayjs/core';
import { tmpdir } from 'os';
import * as path from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1730445296613_8790',
  koa: {
    port: 7001,
  },
  cors: {
    origin: 'http://localhost:8000',
    credentials: true,
    allowMethods: ['GET', 'POST','PUT'],
  
  // origin: (ctx) => {
  //   const allowedOrigins = ['http://localhost:8000', 'http://10.5.33.192:8000'];
  //   if (allowedOrigins.includes(ctx.request.header.origin)) {
  //     return true
  //   }
  //   return false; // 不允许跨域
  // },
  // credentials: true,
  // allowMethods: ['GET', 'POST'],
  },
  jwt: {
    secret: 'lihang.wang', // fs.readFileSync('xxxxx.key')
    sign: {
      // signOptions
      expiresIn: '1000h',
    },
  },

  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://admin:wanglihang123@localhost:27017/hotel?authSource=admin',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // user: '***********',
          // pass: '***********'
        },
        // 关联实体
        entities: ['/entity/mongo'],
      },
    },
  },
  busboy: {
    mode: 'file',
    whitelist: [uploadWhiteList, '.xlsx'],
    tmpdir: path.join(tmpdir(), 'midway-upload-files'),
    cleanTimeout: 1000 * 60 * 1000,
    fileSize: '50mb'
  },
} as MidwayConfig;
