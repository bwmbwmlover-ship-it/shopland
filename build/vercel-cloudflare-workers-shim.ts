// Vercel/Node compatibility shim for source files that import the
// Cloudflare Workers virtual env module. Cloudflare builds still use
// the real virtual module through @cloudflare/vite-plugin.
export const env: Record<string, unknown> = {};
