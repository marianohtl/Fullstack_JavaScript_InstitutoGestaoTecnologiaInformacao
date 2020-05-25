let tabCountries = null;
let tabFavorites = null;

//let allCountries = [];
let countries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;


//iniciando a aplicação com todos os conteudos carregados
addEventListener('load', () => {

  console.log('Start');
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector("#tabFavorites");
  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');
  numberFormat = Intl.NumberFormat('pt-BR');
  doFetchCountries();
});

//Utilizando a função fetch assíncrona  (busca de dados da api)
//Abaixo com o map, eu retorno ao objeto, exatamente os dados do objeto que eu preciso
async function doFetchCountries() {
  const url = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await url.json();
  countries = json.map(country => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag
    };
  });
  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

//montando o html
function renderCountryList() {
  let countriesHTML = '';
  countries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country;
    const countryHTML =
      `<div class='country'>
        <div>
          <a id="${id}"class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}"  alt="${name}"/>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>` ;
    countriesHTML += countryHTML;
  });
  //  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';
  favoriteCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country;

    const favoriteCountryHTML =
      `<div class='country'>
        <div>
          <a id="${id}"class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}"  alt="${name}"/>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>` ;
    favoritesHTML += favoriteCountryHTML;


  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = countries.length;
  countFavorites.textContent = favoriteCountries.length;

  //somatorio 
  const totalPopulation = countries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));//isso retorna um nodeList
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));//isso retorna um nodeList


  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = countries.find(country => country.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];

  //ordenando por ordem alfabética
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  //se o id for diferente, ele vai colocar na lista, ou seja, vai retirar o id que colocamos na lista favoritos
  countries = countries.filter(country => country.id !== id);
  render();
}


function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(country => country.id === id);

  countries = [...countries, countryToRemove];
  countries.sort((a, b) => { return a.name.localeCompare(b.name) });


  favoriteCountries = countries.filter(country => country.id !== id);
  render();

}

function formatNumber(number) {
  return numberFormat.format(number);
}