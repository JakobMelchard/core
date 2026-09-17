import { Raw } from './html.js'

/** @typedef {{req:Request, env:import('./types.js').Env, params:Record<string,string>, url:URL, form:URLSearchParams}} Ctx */
/** @typedef {[method:string, pattern:string, fn:(c:Ctx)=>Promise<Raw|string|Response>|Raw|string|Response]} Route */

/** Segment matcher, not URLPattern: Android WebView support varies. @param {string} pat @param {string} path */
const matchPath = (pat, path) => {
  const a = pat.split('/'), b = path.split('/')
  if (a.length !== b.length) return null
  /** @type {Record<string,string>} */ const p = {}
  return a.every((s, i) => s[0] === ':' ? (p[s.slice(1)] = decodeURIComponent(b[i]), true) : s === b[i]) ? p : null
}

/** @param {Route[]} routes @returns {(req:Request, env:import('./types.js').Env) => Promise<Response>} */
export const router = routes => async (req, env) => {
  const url = new URL(req.url)
  let allowed = false
  for (const [m, pat, fn] of routes) {
    const params = matchPath(pat, url.pathname)
    if (!params) continue
    allowed = true
    if (m !== req.method) continue
    const form = /GET|DELETE/.test(m) ? url.searchParams : new URLSearchParams(await req.text())
    const out = await fn({ req, env, params, url, form })
    return out instanceof Response ? out : new Response(String(out), { headers: { 'content-type': 'text/html; charset=utf-8' } })
  }
  return new Response(allowed ? 'method not allowed' : 'not found', { status: allowed ? 405 : 404 })
}
