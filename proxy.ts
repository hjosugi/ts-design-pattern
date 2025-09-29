interface Server {
  handle(userId: string): void
}

class RealServer implements Server {
  handle(userId: string): void {
    console.log(`Handling request for user: ${userId}`)
  }
}

class ServerProxy implements Server {
  constructor(private server: Server) {}

  private authorize(userId: string): boolean {
    console.log(`Authorizing user: ${userId}`)
    return userId === "admin"
  }

  handle(userId: string): void {
    this.authorize(userId)
      ? this.server.handle(userId)
      : console.log("Access denied")

    console.log("Request handled by proxy")
    this.server.handle(userId)
    console.log("Request completed")
  }
}

const run = () => {
  const realServer = new RealServer()
  const proxy = new ServerProxy(realServer)

  console.log("=========================================")
  proxy.handle("admin")
  console.log("=========================================")
  proxy.handle("user")
  console.log("=========================================")
}

run()
