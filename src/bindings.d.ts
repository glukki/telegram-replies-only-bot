export {}

export interface Env {
  LOGS: KVNamespace
  SETTINGS: KVNamespace<'allowed-chats'>
  HOOK_PATH: string
  TELEGRAM_API_TOKEN: string
}
