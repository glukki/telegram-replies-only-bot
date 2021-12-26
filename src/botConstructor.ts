import { Bot } from 'grammy'
import { BotContext } from './types'
import { Env } from './bindings'
import { workerContext } from './telegramUtils'
import { middlewares } from './tg-handlers'

let bot: Bot<BotContext>

export type getBot = () => Bot<BotContext>
export const getBot = (env?: Env, ctx?: ExecutionContext): Bot<BotContext> => {
  if (bot) {
    return bot
  }

  if (!env || !ctx) {
    throw new Error("Can't init bot, missing env/ctx params")
  }

  bot = new Bot<BotContext>(env.TELEGRAM_API_TOKEN)

  bot.use(workerContext<Env>(env, ctx))

  bot.use(...middlewares)

  return bot
}
