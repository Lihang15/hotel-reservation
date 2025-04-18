import { Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { join } from 'path';
import * as send from 'koa-send';

@Middleware()
export class VitepressServeMiddleware {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const requestedPath = ctx.path;

      const basePath = join(__dirname, '../../static/dist');

      // 定义路径对应关系
      const routeMap: Record<string, string> = {
        '/User/Login': '/User/login.html',
        '/User/Info': '/User/Info.html',
        '/User/No-Permission': '/User/No-Permission.html',
        '/User/UserManagement': '/User/UserManagement.html',
      };

      // 查找匹配项
      const matchedEntry = Object.keys(routeMap).find((prefix) =>
        requestedPath.startsWith(prefix)
      );

      if (matchedEntry) {
        const fileName = routeMap[matchedEntry];
        await send(ctx as any, fileName, { root: basePath });
      } else {
        await next();
      }
    };
  }

  static getName(): string {
    return 'vitepressServe';
  }

  match() {
    return true;
  }
}
