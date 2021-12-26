import { Handler } from '../router'
import { UPDATES } from '../tg-handlers'
import { getBot } from '../botConstructor'

let isHookBound = false

export const status: Handler = async (url, request, env, ctx) => {
  if (url.pathname !== '/status') {
    return
  }

  if (!isHookBound) {
    const url = new URL(request.url)
    url.pathname = env.HOOK_PATH

    await getBot(env, ctx).api.setWebhook(url.toString(), {
      allowed_updates: Array.from(UPDATES.values()),
    })

    isHookBound = true
  }

  const info = await getBot(env, ctx).api.getWebhookInfo()

  return new Response(JSON.stringify(info), {
    headers: {
      'content-type': 'application/json',
    },
  })
}
