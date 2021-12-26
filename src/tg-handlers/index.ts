import { helpMiddleware } from './help'
import { whereAmIMiddleware } from './whereAmI'
import { removeChatNonRepliesMiddleware } from './removeChatNonReplies'

export { UPDATES } from './_events'

export const middlewares = [helpMiddleware, whereAmIMiddleware, removeChatNonRepliesMiddleware]
