import type { Context } from 'koa';
import { webhookSecret } from './webhookPost';

export const isWebhookAuthorizationValid = (ctx: Context) => {
  return ctx.headers.authorization === webhookSecret;
}