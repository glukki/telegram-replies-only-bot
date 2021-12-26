import { Env } from './bindings'

const LOGS_TTL = 30 * 24 * 60 * 60 // 30 days

export const log = async (err: Error, request: Request, env: Env, ctx: ExecutionContext): Promise<void> => {
  const key = `${Date.now()}|${Math.floor(Math.random() * 10000)}`
  const body = [
    `Error: ${err.stack}`,
    `Request: ${JSON.stringify({
      method: request.method,
      url: request.url,
      headers: request.headers,
      data: request.body,
    })}`,
  ].join('\n')

  if (!!ctx.waitUntil && !env.LOGS) {
    return console.error(body)
  }

  try {
    await env.LOGS.put(key, body, { expirationTtl: LOGS_TTL })
  } catch (e) {
    console.error("Can't log error, maybe due to KV write limit:")
    console.error(e)
    console.error(body)
  }
}
