import { Context } from 'grammy'
import { Update } from '@grammyjs/types'
import { Env } from './bindings'
import { WorkerFlavor } from './telegramUtils'

export type UpdateType = Exclude<keyof Update, 'update_id'>

export interface BotContext extends Context, WorkerFlavor<Env> {}
