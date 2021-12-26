import { Bot } from 'grammy'
import { BotContext } from './types'
import { Env } from './bindings'
import { workerContext } from './telegramUtils'
import { middlewares } from './tg-handlers'
import { HAS_CALLBACK_QUERY_HANDLERS } from './tg-handlers/_events'

let bot: Bot<BotContext>

export type getBot = () => Bot<BotContext>
export const getBot = (env?: Env, ctx?: ExecutionContext): Bot<BotContext> => {
  if (bot) {
    return bot
  }

  if (!env || !ctx) {
    throw new Error("Can't init bot, missing env/ctx params")
  }

  bot = new Bot<BotContext>(env.TELEGRAM_API_TOKEN, {
    // TODO: let init once, or define via config, to make `/command@bot` work
    botInfo: {
      is_bot: true,
      username: 'bot',
      can_join_groups: true,
      can_read_all_group_messages: false,
      supports_inline_queries: false,
      id: 1,
      first_name: 'bot',
    },
  })

  bot.use(workerContext<Env>(env, ctx))

  bot.use(...middlewares)

  if (HAS_CALLBACK_QUERY_HANDLERS) {
    // wildcard to handle unhandled requests
    bot.on('callback_query:data', async (ctx) => ctx.answerCallbackQuery())
  }

  return bot
}
