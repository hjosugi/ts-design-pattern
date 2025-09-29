interface MessageApp {
  send(): void
}

class LINE implements MessageApp {
  send() {
    console.log("LINE message")
  }
}

class Twitter implements MessageApp {
  send() {
    console.log("Twitter message")
  }
}

abstract class OS {
  protected app: MessageApp | null = null

  setApp(app: MessageApp) {
    this.app = app
  }

  abstract sendMessage(): void
}

class IOS extends OS {
  sendMessage() {
    if (this.app) {
      console.log("iOS:")
      this.app.send()
    }
  }
}

class Android extends OS {
  sendMessage() {
    if (this.app) {
      console.log("Android:")
      this.app.send()
    }
  }
}

;(() => {
  const ios = new IOS()
  ios.setApp(new LINE())
  ios.sendMessage()

  const android = new Android()
  android.setApp(new Twitter())
  android.sendMessage()
})()
