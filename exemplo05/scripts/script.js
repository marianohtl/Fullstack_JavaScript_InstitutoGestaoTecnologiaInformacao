'use-strict' //O JavaScript acusa mais erros

console.log('Hello, Word.')

//var tem scopo abrangente
//let tem escopo reduzido


function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  i = 20
  console.log(i);
}

function withLet() {
  for (let j = 0; j < 10; j++) {
    console.log('var' + j);
  }
  j = 20
  console.log(j);
}

withVar();
withLet();

//const não pode reatribuir
// const c = 10;
// c = 10;

const d = [];
d.push(1);
console.log(d)

function sum(a, b) {
  return a + b
}

console.log(sum(2, 2))

//função anônima
const sum2 = function (a, b) {
  return a + b
}

console.log(sum2(2, 2))

//arrow function 
const sum3 = (a, b) => {
  return a + b
}

console.log(sum3(2, 2))

//arrow function reduzida
const sum4 = (a, b) => a + b
console.log(sum4(2, 2))


//template literals
const name = 'Thalita'
const surName = 'Mariano'
const text1 = `Meu nome é ${name} ${surName}`

console.log(text1)

//Default parâmetres

const sum5 = (a, b = 10) => a + b
console.log(sum5(2))


const sum6 = (a = 10, b = 10) => a + b
console.log(sum6())


//métodos de arrays com ES6
//callback para percorrer cada ítem do vetor


