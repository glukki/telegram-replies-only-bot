import { UpdateType } from '../types'

export const UPDATES = new Set<UpdateType>()

export const registerUpdatesSubscription = (event: UpdateType): void => {
  UPDATES.add(event)
}
