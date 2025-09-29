interface ITransactionDelegate {
  deduct(amount: number, context: Account): void
}

class Account {
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: type
  constructor(private _type: string, private _balance: number) {}

  get balance() {
    return this._balance
  }

  set balance(balance) {
    this._balance = balance
  }
}

class Transaction implements ITransactionDelegate {
  deduct = (amount: number, context: Account) => {
    context.balance = context.balance - amount
  }
}

class BankAccount {
  private readonly _card: Account
  private readonly _savings: Account
  private _delegate: ITransactionDelegate = new Transaction()

  constructor(savingsBalance: number, cardBalance: number) {
    this._card = new Account("card", cardBalance)
    this._savings = new Account("savings", savingsBalance)
  }

  charge = (amount: number) => {
    if (this._card.balance >= amount) {
      this._delegate.deduct(amount, this._card)
    } else {
      this._delegate.deduct(amount, this._savings)
    }

    console.log("Item bought for", amount)
  }

  showBalances = () => {
    console.log("Card balance:", this._card.balance)
    console.log("Savings balance:", this._savings.balance)
    console.log("=-=-=-=-=-=-=-=-=-=-=")
  }
}

class Customer {
  constructor(private _bankAccount: BankAccount) {}

  showBalances = () => this._bankAccount.showBalances()

  buySomething = (price: number) => this._bankAccount.charge(price)
}

// Creates a new customer, with 1000 in savings and 300 in his card
const customer = new Customer(new BankAccount(1000, 300))

// Check balances
// Will output 300/1000
customer.showBalances()

// Buy something for 300
// Will be charged to the card
customer.buySomething(300)

// Check balances
// Will output 0/1000
customer.showBalances()

// Buy something for 200
// This one will be charged to the savings
customer.buySomething(200)

// Check balances
// Will output 0/800
customer.showBalances()
