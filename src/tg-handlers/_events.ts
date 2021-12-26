import { UpdateType } from '../types'

export const UPDATES = new Set<UpdateType>()

export const registerUpdatesSubscription = (event: UpdateType): void => {
  UPDATES.add(event)
}

export let HAS_CALLBACK_QUERY_HANDLERS = false

export const registerCallbackQueryHandler = (): void => {
  HAS_CALLBACK_QUERY_HANDLERS = true
}
