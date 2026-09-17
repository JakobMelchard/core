import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runStoreContract } from '../src/store/contract.js'
import { memoryStore } from '../src/store/memory.js'
import { fsStore } from '../src/store/fs.js'

runStoreContract('memory', async () => memoryStore())
runStoreContract('fs', async () => fsStore(await mkdtemp(join(tmpdir(), 'store-'))))
