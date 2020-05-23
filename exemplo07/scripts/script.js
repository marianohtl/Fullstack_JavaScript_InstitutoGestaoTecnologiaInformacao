'use-strict' //O JavaScript acusa mais erros

console.log('Hello, Word.')

window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
})

//este, quebra os vetores e os junta como único  spread
function doSpread() {
  const marriedMen = people.results.filter(
    person => (person.name.title === 'Mr')
  );

  const marriedWoman = people.results.filter(
    person => (person.name.title === 'Ms')
  );
  console.log(marriedMen);
  console.log(marriedWoman);

  const marriedPeople = [...marriedMen, ...marriedWoman, { msg: 'Olar Spread' }]

  console.log(marriedPeople);
}


//rest ele agrupa valores de vetores
function doRest() {
  console.log(infiniteSum(1, 2, 4, 5, 6, 7, 8))
}

//operador rest ...x
function infiniteSum(...number) {
  return number.reduce((acumulator, current) => acumulator + current, 0)
  //acumulador, valor atual, ponto de partida
  console.log(numbers)
}

//Destructuring
function doDestructuring() {
  //rescrita repetitiva
  // const username = first.login.username;
  // const password = first.login.password
  const first = people.results[0];
  const { username, password } = first.login;
  console.log(username)
  console.log(password)

}



