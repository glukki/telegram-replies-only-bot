import { Env } from './bindings'
import { log } from './log'
import { handleRequest } from './handler'

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx)
    } catch (e) {
      ctx.waitUntil(log(e as Error, request, env, ctx))

      return new Response((e as Error).message || 'An error occurred!', {
        status: (e as { statusCode?: number })?.statusCode || 500,
      })
    }
  },
} as ExportedHandler<Env>
