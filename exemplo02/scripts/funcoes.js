function sum(a, b) {
  return a + b;
}

console.log(sum(10, 10))


function compareNumber(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
}

function compareNumber2(a, b) {
  return a - b
}


console.log(compareNumber(1, 2))
console.log(compareNumber(3, 2))
console.log(compareNumber(1, 1))


function superSum(from, upTo) {
  for (var i = from; i <= upTo; i++) {
    sum += i
  }
  return sum
}