import Router, { IMiddleware } from 'koa-router';

interface RouteMetadata {
  [key: string]: any;
}
type HttpVerb = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';

interface RouteConfig {
  method: HttpVerb;
  path: string;
  metadata?: RouteMetadata;
  middleware?: IMiddleware[] | IMiddleware;
  name?: string;
}

export const router = new Router();

export const Route =
  (method: HttpVerb, path: string, config: Omit<RouteConfig, 'method' | 'path'> = {}) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    if (typeof originalMethod !== 'function') {
      throw new Error('Route must be a function');
    }
    const middleware = originalMethod.bind(target);
    const defaultName = typeof target.name === 'string' && target.name ? `${target.name}.${propertyKey}` : undefined;
    const { metadata = {}, middleware: customMiddleware = [], name = defaultName } = config;
    middleware.metadata = metadata;
    const args = [path, ...(Array.isArray(customMiddleware) ? customMiddleware : [customMiddleware]), middleware];

    if (name) {
      args.unshift(name);
    }
    (router as any)[method](...args);
    return descriptor;
  };
