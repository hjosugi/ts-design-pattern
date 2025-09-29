interface Component {
  getLogMessage(msg: string): string
}
class Logger implements Component {
  getLogMessage(msg: string): string {
    return msg
  }
}

abstract class Decorator implements Component {
  constructor(protected component: Component) {}

  abstract getLogMessage(msg: string): string
}

class TimestampDecorator extends Decorator {
  getLogMessage(msg: string): string {
    const timestamp = new Date().toLocaleString("ja-JP")
    return `[${timestamp}] ${this.component.getLogMessage(msg)}`
  }
}

class LevelDecorator extends Decorator {
  constructor(component: Component, private level: string) {
    super(component)
  }

  override getLogMessage(msg: string): string {
    return `[${this.level}] ${this.component.getLogMessage(msg)}`
  }
}

function run() {
  const logger = new Logger()
  console.log(logger.getLogMessage("This is a log message."))

  const timestampLogger = new TimestampDecorator(logger)
  console.log(timestampLogger.getLogMessage("This is a log message."))

  const levelLogger = new LevelDecorator(timestampLogger, "INFO")
  console.log(levelLogger.getLogMessage("This is a log message."))
}
run()
