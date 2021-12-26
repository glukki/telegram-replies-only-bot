import { webhookCallback } from 'grammy'
import { Handler } from '../router'
import { getBot } from '../botConstructor'
import { webhookAdapter } from '../telegramUtils'

let hook: Handler

export const telegramWebhook: Handler = async (url, request, env, ctx) => {
  if (url.pathname !== env.HOOK_PATH) {
    return
  }

  if (!hook) {
    hook = webhookCallback(getBot(env, ctx), webhookAdapter)
  }

  return hook(url, request, env, ctx)
}
