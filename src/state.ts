interface UserState {
  isAuthenticated(): boolean
  displayPage(): void
  nextState(): UserState
}

class AuthorizationState implements UserState {
  isAuthenticated(): boolean {
    return true
  }

  displayPage(): void {
    console.log("TOP")
  }

  nextState(): UserState {
    return new UnAuthorizedState()
  }
}

class UnAuthorizedState implements UserState {
  isAuthenticated(): boolean {
    return false
  }

  displayPage(): void {
    console.log("LOGIN")
  }

  nextState(): UserState {
    return new AuthorizationState()
  }
}

class User {
  private state: UserState = new UnAuthorizedState()

  isAuthenticated(): boolean {
    return this.state.isAuthenticated()
  }

  displayPage(): void {
    this.state.displayPage()
  }

  login(): void {
    this.state = this.state.nextState()
  }
}

function run() {
  const user = new User()
  user.displayPage()
  console.log("isAuthenticated:", user.isAuthenticated())
  user.login()
  user.displayPage()
  console.log("isAuthenticated:", user.isAuthenticated())
  user.login()
  user.displayPage()
}

run()
