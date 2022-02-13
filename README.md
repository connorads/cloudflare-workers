# Cloudflare Workers

This repo contains Cloudflare Workers scripts

## Build pages

Based on _[Triggering a new build every hour
](https://developers.cloudflare.com/pages/platform/api#triggering-a-new-build-every-hour)_

### Local dev

1. Set vars in in `wrangler.toml`, including `API_KEY` (don't commit or deploy ⚠️)
2. `npm run dev`

### Deploy

1. Set vars in in `wrangler.toml`
2. Deploy `npm run publish your-worker-name`
3. Set Cloudflare Global API key secret `npm run secret your-worker-name`

### Enable cron

1. Navigate to Cloudflare Dashboard Workers triggers
2. Disable route
3. Enable cron