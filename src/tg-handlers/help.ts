import { Composer } from 'grammy'
import { BotContext } from '../types'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const helpMiddleware = new Composer<BotContext>()

const HELP_MESSAGE = `Warning!
I'm a private bot.
I will work only with my creator chat. 

Function
I will remove chat messages that are not replies.

Why?
If you have a channel, a discussions chat connected to it, and want to make all discussions be contained within channel "comments". 

How to setup?
1. Add me as a discussions chat admin
2. Grant me the \`can_delete_messages\` permission
3. Profit! 

Available commands:
* /help - show bot description and commands
* /whereami - get the chat ID
`

helpMiddleware.on('message:text').command(['help', 'start'], async (ctx) => {
  return ctx.reply(HELP_MESSAGE)
})
