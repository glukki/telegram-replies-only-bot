# telegram-replies-only-bot

This bot will remove chat messages that are not replies.

Useful for when you have an open chat for channel comments, but want to keep conversations attached to posts.

### Setup

Make the `wrangler.toml` file out of `wrangler.example.toml` template, add `account_id` setting if you have access to multiple accounts, and replace placeholders:

- `%%LOGS%%` - an id of KV to store error logs to
- `%%SETTINGS%%` - an id of KV to read settings from

In the `%%SETTINGS%%` KV on Cloudflare define the `allowed-chats` key with a list of comma-separated chat IDs

Make the `.dev.vars` file out of `.dev.example.vars` template, and replace placeholders:

- `%%HOOK_PATH%%` - a secret webhook path, that Telegram server will call, in `/hook` format
- `%%TELEGRAM_API_TOKEN%%` - Telegram Bot API token

### Build

Run `npm run build`

### Development

Run `npm run dev`

### Deployment

Set up secrets:

- `npx wrangler secret put HOOK_PATH`
- `npx wrangler secret put TELEGRAM_API_TOKEN`

Run `npm run deploy`

Open the `/status` page of the deployed instance, to trigger bot hook registration on Telegram.
