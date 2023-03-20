import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import { gate } from './middlewares/gate.middleware';
import { router } from './router';
import './functions';

const app = new Koa();

// 加载中间件
app.use(gate());
app.use(bodyParser());
app.use(serve('public'));
app.use(router.routes());
app.use(router.allowedMethods());

console.log(
  'registered routing list: ',
  JSON.stringify(
    router.stack.map((layer) => [layer.methods.length > 10 ? 'All' : layer.methods.join(','), layer.path].join('  ')),
    null,
    2
  )
);

export default app;
