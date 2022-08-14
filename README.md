# telegram-replies-only-bot

This bot will remove chat messages that are not replies.

Useful for when you have an open chat for channel comments, but want to keep conversations attached to posts.

### Setup

Make the `wrangler.toml` file out of `wrangler.example.toml` template, and replace placeholders:

- `%%LOGS%%` - an id of KV to store error logs to
- `%%SETTINGS%%` - an id of KV to read settings from
- `%%HOOK_PATH%%` - a secret webhook path, that Telegram server will call, in `/hook` format
- `%%TELEGRAM_API_TOKEN%%` - Telegram Bot API token

In the `%%SETTINGS%%` KV on Cloudflare define the `allowed-chats` key with a list of comma-separated chat IDs

### Build

Run `npm run build`

### Development

Run `npm run dev`

### Deployment

Run `npm run deploy`
