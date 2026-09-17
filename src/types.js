/** @typedef {{list(prefix:string):Promise<string[]>, get(path:string):Promise<string|null>, put(path:string, body:string):Promise<void>, del(path:string):Promise<void>}} Store */
/** @typedef {{store:Store, device:string, now():Date}} Env */
export {}
