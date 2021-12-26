import { Handler } from '../router'

import { status } from './status'
import { telegramWebhook } from './telegramWebhook'

export const routes: Handler[] = [status, telegramWebhook]
