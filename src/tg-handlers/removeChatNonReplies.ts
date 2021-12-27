import { Composer } from 'grammy'
import { BotContext } from '../types'
import { isGroupChat } from '../telegramUtils'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const removeChatNonRepliesMiddleware = new Composer<BotContext>()

const SETTING_ALLOWED_CHATS = 'allowed-chats'
let ALLOWED_CHATS: Set<string>

removeChatNonRepliesMiddleware
  .on('message')
  .filter(async (ctx) => {
    if (!ALLOWED_CHATS) {
      ALLOWED_CHATS = new Set(
        ((await ctx.worker.env.SETTINGS.get(SETTING_ALLOWED_CHATS)) ?? '')
          .split(',')
          .filter(Boolean)
          .map((id) => id.trim()),
      )
    }

    return ALLOWED_CHATS.has(String(ctx.message.chat.id))
  })
  .filter((ctx) => isGroupChat(ctx.chat))
  .filter((ctx) => !ctx.message.reply_to_message && !ctx.message.is_automatic_forward)
  .use((ctx) => ctx.deleteMessage())
