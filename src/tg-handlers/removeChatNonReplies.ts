import { Composer } from 'grammy'
import { BotContext } from '../types'
import { isGroupChat } from '../telegramUtils'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const removeChatNonRepliesMiddleware = new Composer<BotContext>()

let CHAT_IDS: Set<string>

removeChatNonRepliesMiddleware
  .on('message')
  .filter((ctx) => {
    if (!CHAT_IDS) {
      CHAT_IDS = new Set(
        ctx.worker.env.ALLOWED_CHAT_IDS.split(',')
          .filter(Boolean)
          .map((id) => id.trim()),
      )
    }

    return CHAT_IDS.has(String(ctx.message.chat.id))
  })
  .filter((ctx) => isGroupChat(ctx.chat))
  .filter((ctx) => !ctx.message.reply_to_message)
  .use((ctx) => ctx.deleteMessage())
