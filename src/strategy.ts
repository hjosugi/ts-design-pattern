interface SortStrategy {
  sort(list: number[]): number[]
}

class BubbleSort implements SortStrategy {
  sort(list: number[]): number[] {
    return bubbleSort(list)
  }
}

class InsertionSort implements SortStrategy {
  sort(list: number[]): number[] {
    return insertionSort(list)
  }
}

function insertionSort(arr: number[]): number[] {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    const key = arr[i]!
    let j = i - 1
    while (j >= 0 && arr[j]! > key) {
      arr[j + 1] = arr[j]!
      j--
    }
    arr[j + 1] = key
  }
  return arr
}

function bubbleSort(arr: number[]): number[] {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const left = arr[j]!
      const right = arr[j + 1]!
      if (left > right) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!]
      }
    }
  }

  return arr
}

function run() {
  const list = [64, 34, 25, 12, 22, 11, 90]

  const bubbleSortStrategy = new BubbleSort()
  console.log("Using Bubble Sort:")
  console.log(bubbleSortStrategy.sort([...list]))

  const insertionSortStrategy = new InsertionSort()
  console.log("Using Insertion Sort:")
  console.log(insertionSortStrategy.sort([...list]))
}

run()
