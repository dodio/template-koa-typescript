import { Route } from '@/router';
import { Context } from 'koa';

export default class HomeController {
  @Route('all', '/')
  public static async home(ctx: Context) {
    ctx.body = 'body';
  }
}
