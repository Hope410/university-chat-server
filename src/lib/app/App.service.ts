import express from 'express'
import cors from 'cors'
import * as http from 'http'

import * as config from '@/config'
import SocketService from '@/lib/socket/Socket.service'

export default class AppService {
  private app: express.Application
  private server: http.Server
  private socketService: SocketService
  private port: string | number

  constructor () {
    this.createApp()
    this.config()
    this.createServer()
    this.createSockets()
    this.listen()
  }

  public static init () {
    return new AppService()
  }

  public listen (): void {
    this.server.listen(this.port, () =>
      console.info('Running server on port %s', this.port)
    )

    this.socketService.listen()
  }

  private createApp (): void {
    this.app = express()
    this.app.use(cors())
  }

  private createServer (): void {
    this.server = http.createServer(this.app)
  }

  private config (): void {
    this.port = config.PORT
  }

  private createSockets (): void {
    this.socketService = SocketService.init({ server: this.server })
  }
}
