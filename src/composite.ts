abstract class Entry {
  constructor(public name: string) {}

  getName(): string {
    return this.name
  }

  abstract getSize(): number
  abstract remove(): void
}

class File extends Entry {
  constructor(name: string, private size: number) {
    super(name)
  }

  getSize(): number {
    return this.size
  }

  remove(): void {
    console.log(`File: ${this.name} removed`)
  }
}

class Directory extends Entry {
  private entries: Entry[] = []

  constructor(name: string) {
    super(name)
    this.entries = []
  }

  remove(): void {
    console.log(`Directory: ${this.name} removed`)
  }

  getSize(): number {
    return this.entries.reduce((total, entry) => total + entry.getSize(), 0)
  }

  add(entry: Entry): void {
    this.entries.push(entry)
  }
}

const run = () => {
  const dir = new Directory("root")
  const file1 = new File("file1.txt", 100)
  const file2 = new File("file2.txt", 200)

  dir.add(file1)
  dir.add(file2)
  console.log(`Total size of root directory: ${dir.getSize()} bytes`)

  dir.remove()
  file1.remove()
  file2.remove()
}

run()
