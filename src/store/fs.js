import { mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, join, relative, sep } from 'node:path'

/** @param {string} root @returns {import('../types.js').Store} */
export const fsStore = root => ({
  async list(p) {
    // prefix may be partial filename; list its directory, filter by string prefix like R2/KV
    const dir = join(root, p.endsWith('/') ? p : dirname(p))
    const names = await readdir(dir, { recursive: true, withFileTypes: true }).catch(() => [])
    return names
      .filter(d => d.isFile() && !d.name.endsWith('.tmp'))
      .map(d => relative(root, join(d.parentPath, d.name)).split(sep).join('/'))
      .filter(k => k.startsWith(p))
      .sort()
  },
  get: k => readFile(join(root, k), 'utf8').catch(() => null),
  async put(k, v) {
    const f = join(root, k)
    await mkdir(dirname(f), { recursive: true })
    // tmp+rename: Syncthing must never pick up a half-written file
    await writeFile(f + '.tmp', v)
    await rename(f + '.tmp', f)
  },
  del: k => rm(join(root, k), { force: true }),
})
