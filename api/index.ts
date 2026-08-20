import type { IncomingMessage, ServerResponse } from 'node:http'
import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

const APP_ROOT = new URL('../', import.meta.url)

const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }

  return import(filePath)
}

const ignitor = new Ignitor(APP_ROOT, { importer: IMPORTER }).tap((app) => {
  app.booting(async () => {
    await import('#start/env')
  })
})

let handler: ((req: IncomingMessage, res: ServerResponse) => unknown) | undefined
let initialization: Promise<void> | undefined

async function initialize() {
  if (!initialization) {
    initialization = (async () => {
      const app = ignitor.createApp('web')
      await app.init()
      await app.boot()
      await app.start(async () => {
        const server = await app.container.make('server')
        await server.boot()
        handler = server.handle.bind(server)
      })
    })()
  }

  await initialization
}

export default async function apiHandler(req: IncomingMessage, res: ServerResponse) {
  await initialize()
  return handler!(req, res)
}
