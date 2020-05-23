'use-strict' //O JavaScript acusa mais erros

console.log('Hello, Word.')
console.log('Olar')

window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
  doSort2();
  doSort3();
  doSort4();
})


//métodos imutáveis

function doMap() {
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    }
  })

  console.log(nameEmailArray)
  return nameEmailArray
};

//filter pega a proposição lógica e conforme true or false ele atende a proposição posta
function doFilter() {
  const olderThan60 = people.results.filter(person => {
    return person.dob.age > 60;
  });
  let a = doReduce()
  console.log(olderThan60);
}

//Filtrando sobrenome, nome e título
function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
  });
  console.log(mappedPeople)
}


//reduce retorna um único valor (este vai somar as idades)

//ele aceita um callback mais complexo
function doReduce() {
  const totalAges = people.results.reduce((acumulator, curremt) => {
    return acumulator + curremt.dob.age;
  }, 0);
  console.log(totalAges)
}

//returna o primeiro objeto que foi encontrado 
function doFind() {
  const found = people.results.find(person => { return person.location.state === 'Minas Gerais'; });
  console.log(found)
}

//retorna true or false
function doSome() {
  const found = people.results.some(
    person => { return person.location.state === 'Amazonas'; }
  );
  console.log(found);
}

//verifica se todos os nat de todos os objetos correspondem a comparação lógica que queremos
function doEvery() {
  const every = people.results.every(
    person => { return person.nat == 'BR' }
  )
  console.log(every)
}

// retorna uma lista de nomes ordenados
//short faz a ordenação conforme uma função que especificarmos
function doSort() {
  //mapeando só os nomes que comece com a lertra A
  const mappedNames = people.results.map(person => { return person.name.first }).filter(person => person.startsWith('A')).sort();
  console.log(mappedNames)
}

// retorna uma lista de nomes ordenados
function doSort2() {
  //mapeando só os nomes que comece com a lertra A
  const mappedNames = people.results.map(person => { return { name: person.name.first } }).filter(person => person.name.startsWith('A')).sort((a, b) => { return a.name.localeCompare(b.name); });
  console.log(mappedNames)
}

//filtrando   por tamanho do comprimento da string de forma ordenada
function doSort3() {
  //mapeando só os nomes que comece com a lertra A
  const mappedNames = people.results.map(person => { return { name: person.name.first } }).filter(person => person.name.startsWith('A')).sort((a, b) => { return a.name.length - b.name.length });
  console.log(mappedNames)
}

function doSort4() {
  //mapeando só os nomes que comece com a lertra A
  const mappedNames = people.results.map(person => { return { name: person.name.first } }).filter(person => person.name.startsWith('A')).sort((a, b) => { return b.name.length - a.name.length });
  console.log(mappedNames)
}