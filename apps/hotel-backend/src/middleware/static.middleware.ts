import { Middleware } from '@midwayjs/core';
import * as serve from 'koa-static';
import { join } from 'path';

@Middleware()
export class StaticFileMiddleware {
  resolve() {
    // 静态目录路径，比如 ./public 或 ./docs/.vitepress/dist
    const staticPath = join(__dirname,'../../static/dist');
    console.log('静态目录',staticPath,__dirname);
    
    // 返回 Koa 中间件
    return serve(staticPath);
  }

  static getName(): string {
    return 'staticFile'; // 中间件名称
  }

  // 是否全局中间件
  match() {
    return true;
  }
}
