import { createServer } from 'node:http'
import { fsStore } from '@jakobmelchard/core/store/fs'
import { handle } from './src/app.js'

// TODO: wire up node:http → handle with fs store
const env = { store: fsStore(process.env.APP_DATA ?? 'data'), device: process.env.APP_DEVICE ?? 'desk', now: () => new Date() }

createServer(async (req, res) => {
  const chunks = []
  for await (const c of req) chunks.push(c)
  const r = await handle(new Request(`http://${req.headers.host}${req.url}`, {
    method: req.method, headers: /** @type {Record<string,string>} */ (req.headers), body: chunks.length ? Buffer.concat(chunks) : undefined,
  }), env)
  res.writeHead(r.status, Object.fromEntries(r.headers)).end(Buffer.from(await r.arrayBuffer()))
}).listen(Number(process.env.PORT ?? 8080), () => console.log(`app on :${process.env.PORT ?? 8080}`))
