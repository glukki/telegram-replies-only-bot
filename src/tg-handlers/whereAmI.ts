import { Composer } from 'grammy'
import { BotContext } from '../types'
import { isGroupChat } from '../telegramUtils'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const whereAmIMiddleware = new Composer<BotContext>()

whereAmIMiddleware
  .on('message:text')
  .filter((ctx) => isGroupChat(ctx.chat))
  .command('whereami', async (ctx) => {
    return ctx.reply('Current chat ID is:\n' + ctx.chat.id, {
      reply_to_message_id: ctx.message.message_id,
    })
  })
