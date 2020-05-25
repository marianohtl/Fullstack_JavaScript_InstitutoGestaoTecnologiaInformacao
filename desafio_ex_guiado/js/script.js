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


  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");
  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  doFetchCountries();
  showDataCountries();
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
      flag
    };
  });
  showDataCountries(countries);
  //console.log(countries);
}


function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function showDataCountries() {
  // let countriesHTML = '<div>';
  // countries.forEach(country => {
  //   const { name, tag, id, population } = country;
  //   const coutryHTML = ` 
  //   <div class="country">
  //       <div> 
  //         div 1
  //       </div>
  //       <div> 
  //         div 2
  //       </div>
  //       <div> 
  //         div 3
  //       </div>
  //   </div>`;

  //   countriesHTML += countryHTML;
  // })

}


function renderCountryList() {
  console.log("rendering...");
}
function renderFavorites() {
  console.log("rendering...");
}
function renderSummary() {
  console.log("rendering...");
}
function handleCountryButtons() {
  console.log("rendering...");
}
