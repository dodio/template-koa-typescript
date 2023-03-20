import { Context, Next } from 'koa';

export const gate = () => async (ctx: Context, next: Next) => {
  console.log(`[INFO] ${ctx.method} ${ctx.url}`);

  try {
    await next();
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      ctx.status = error.status;
      ctx.body = { error: error.message };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
};

export class CustomError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
