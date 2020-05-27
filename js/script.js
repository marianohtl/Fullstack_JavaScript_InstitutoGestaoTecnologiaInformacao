let tabCountries = null;
let tabFavorites = null;


let inputValue = document.querySelector('#Search');
let sectionPeoples = null;
//let allCountries = [];
let peoples = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;


//iniciando a aplicação com todos os conteudos carregados
addEventListener('load', () => {
  sectionPeoples = document.querySelector('#peoples');

  console.log('Start');
  // tabCountries = document.querySelector('#tabCountries');
  // tabFavorites = document.querySelector("#tabFavorites");
  // countCountries = document.querySelector("#countCountries");
  // countFavorites = document.querySelector("#countFavorites");
  // totalPopulationList = document.querySelector('#totalPopulationList');
  // totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');
  // numberFormat = Intl.NumberFormat('pt-BR');
  doFetchPeoples();
});
inputValue.addEventListener('change', filterName);

//Utilizando a função fetch assíncrona  (busca de dados da api)
//Abaixo com o map, eu retorno ao objeto, exatamente os dados do objeto que eu preciso
async function doFetchPeoples() {
  const url = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await url.json();

  console.log(json);
  peoples = json.results.map(person => {
    const { name, picture, dob, gender, login } = person;

    return {
      id: login.uuid,
      firstname: name.first,
      lastname: name.last,
      picture,
      age: dob.age,
      gender,
    };
  });
  console.log(peoples)
  render();
}

function render() {
  //renderPeoples();
  filterName();
}


//listando todas as pessoas da api
// function renderPeoples() {
//   let peoplesHTML = '';
//   peoples.sort((a, b) => {
//     return a.firstname.localeCompare(b.firstname);
//   });
//   peoples.forEach(person => {
//     const { name, picture, dob, gender, login } = person;
//     const personHTML =
//       `<div class="pessoas">
//       <div class='person-photo-name'>
//         <img src="${picture.thumbnail}">
//         <h3>${person.firstname} ${person.lastname}, ${person.age} anos</h3>
//       </div>
//     </div>`

//     peoplesHTML += personHTML;
//   })
//   peoplesHTML += '</div>';
//   sectionPeoples.innerHTML = peoplesHTML;
// }


function filterName() {
  let peoplesFilteredHTML = '';
  let filteredPeople;
  let inputValueUpper = inputValue.value.toUpperCase();
  console.log(inputValueUpper)
  filteredPeople = peoples.filter(people => people.firstname.toUpperCase().includes(inputValueUpper) || people.lastname.toUpperCase().includes(inputValueUpper));

  //let idades = 0;

  const idades = filteredPeople.reduce(function (acumulator, currentValue) { return acumulator + currentValue.age }, 0);
  let totalPeople = filteredPeople.length;
  let mediaAge = (idades / totalPeople).toPrecision(4);
  console.log(totalPeople);
  console.log(idades);
  console.log(mediaAge);

  let fem = filteredPeople.filter(f => f.gender === "female");
  let qntFem = fem.length;
  let masc = filteredPeople.filter(f => f.gender === "male");
  console.log(`Masculino: ${masc.length}`);
  console.log(`Feminino: ${fem.length}`);
  console.log(`Usuários Totais: ${totalPeople}`);
  console.log(`Idades Total: ${idades}`);
  console.log(`Idades Média: ${mediaAge}`);

  filteredPeople.forEach(person => {
    const { name, picture, dob, gender, login } = person;
    const personFilteredHTML =
      `<div class="pessoas">
      <div class='person-photo-name'>
        <img src="${picture.thumbnail}">
        <h3>${person.firstname} ${person.lastname}, ${person.age} anos</h3>
      </div>
    </div>`

    peoplesFilteredHTML += personFilteredHTML;
  })
  peoplesFilteredHTML += '</div>';
  sectionPeoples.innerHTML = peoplesFilteredHTML;
}




// function renderFavorites() {
//   let favoritesHTML = '<div>';
//   favoriteCountries.forEach(country => {
//     const { name, flag, id, population, formattedPopulation } = country;

//     const favoriteCountryHTML =
//       `<div class='country'>
//         <div>
//           <a id="${id}"class="waves-effect waves-light btn red darken-4">-</a>
//         </div>
//         <div>
//           <img src="${flag}"  alt="${name}"/>
//         </div>
//         <div>
//           <ul>
//             <li>${name}</li>
//             <li>${formattedPopulation}</li>
//           </ul>
//         </div>
//       </div>` ;
//     favoritesHTML += favoriteCountryHTML;


//   });

//   favoritesHTML += '</div>';
//   tabFavorites.innerHTML = favoritesHTML;
// }

// function renderSummary() {
//   countCountries.textContent = countries.length;
//   countFavorites.textContent = favoriteCountries.length;

//   //somatorio 
//   const totalPopulation = countries.reduce((accumulator, current) => {
//     return accumulator + current.population;
//   }, 0);

//   const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
//     return accumulator + current.population;
//   }, 0);

//   totalPopulationList.textContent = formatNumber(totalPopulation);
//   totalPopulationFavorites.textContent = formatNumber(totalFavorites);
// }

// function handleCountryButtons() {
//   const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));//isso retorna um nodeList
//   const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));//isso retorna um nodeList


//   countryButtons.forEach(button => {
//     button.addEventListener('click', () => addToFavorites(button.id));
//   });

//   favoriteButtons.forEach(button => {
//     button.addEventListener('click', () => removeFromFavorites(button.id));
//   });
// }

// function addToFavorites(id) {
//   const countryToAdd = countries.find(country => country.id === id);
//   favoriteCountries = [...favoriteCountries, countryToAdd];

//   //ordenando por ordem alfabética
//   favoriteCountries.sort((a, b) => {
//     return a.name.localeCompare(b.name);
//   });

//   //se o id for diferente, ele vai colocar na lista, ou seja, vai retirar o id que colocamos na lista favoritos
//   countries = countries.filter(country => country.id !== id);
//   render();
// }


// function removeFromFavorites(id) {
//   const countryToRemove = favoriteCountries.find(country => country.id === id);

//   countries = [...countries, countryToRemove];
//   countries.sort((a, b) => { return a.name.localeCompare(b.name) });


//   favoriteCountries = countries.filter(country => country.id !== id);
//   render();

// }

// function formatNumber(number) {
//   return numberFormat.format(number);
// }