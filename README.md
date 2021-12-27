# telegram-replies-only-bot

This bot will remove chat messages that are not replies.

### Setup

Copy `wrangler.example.toml` template into `wrangler.toml` and replace placeholders:

- `%%LOGS%%` - an id of KV to store error logs to
- `%%SETTINGS%%` - an id of KV to read settings from
- `%%HOOK_PATH%%` - a secret webhook path, that Telegram server will call, in `/hook` format
- `%%TELEGRAM_API_TOKEN%%` - Telegram Bot API token

In the `%%SETTINGS%%` KV on Cloudflare define the `allowed-chats` key with a list of comma-separated chat IDs

### Build

Run `npm run-script build`

### Development

Run `wrangler dev`

### Deployment

Run `wrangler publish`
