# telegram-replies-only-bot

This bot will remove chat messages that are not replies.

### Setup

Make a `wrangler.toml` file from the `wrangler.example.toml` template, and define variables:

- `HOOK_PATH` - webhook path, that Telegram server will call
- `TELEGRAM_API_TOKEN` - Telegram Bot API token
- `ALLOWED_CHAT_IDS` - Comma-separated list of chat IDs to moderate, like `1,2,3`

### Build

Run `npm run-script build`

### Development

Run `wrangler dev`

### Deployment

Run `wrangler publish`
