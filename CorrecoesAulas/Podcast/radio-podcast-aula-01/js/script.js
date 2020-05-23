window.addEventListener('load', start);

var inputFrequency = null;
var inputRange = null;
var divContent = null;

function start() {
  inputFrequency = document.querySelector('#inputFrequency');
  inputRange = document.querySelector('#inputRange');
  divContent = document.querySelector('#divContent');

  inputRange.addEventListener('input', handleRangeChange);
}

function handleRangeChange(event) {
  var frequencyValue = event.target.value;
  inputFrequency.value = frequencyValue;

  renderPodcast(frequencyValue);
}

function renderPodcast(frequencyValue) {
  //array.find

  const foundPodcast = realPodcasts.find(function (podcast) {
    return frequencyValue === podcast.id;
  });

  if (!foundPodcast) {
    divContent.textContent = 'Nenhum podcast encontrado!!';
  } else {
    //achou
    // template literals, símbolo de crase `
    divContent.innerHTML = `
        <img src='../img/${foundPodcast.img}' />
        <h2>${foundPodcast.title}</h2>
        <p>${foundPodcast.description}</p>      
      `;
  }
}
