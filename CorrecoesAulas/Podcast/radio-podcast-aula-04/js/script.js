window.addEventListener('load', start);

var globalInputRange = null;
var globalInputFrequency = null;
var globalDivPodcast = null;

function start() {
  globalInputRange = document.querySelector('#inputRange');
  globalInputFrequency = document.querySelector('#inputFrequency');
  globalDivPodcast = document.querySelector('#divPodcast');

  globalInputRange.addEventListener('input', handleRangeChange);
  showPodcastFrom(globalInputFrequency.value);
}

function handleRangeChange(event) {
  var currentFrequency = event.target.value;
  globalInputFrequency.value = currentFrequency;

  showPodcastFrom(currentFrequency);
}

function showPodcastFrom(frequency) {
  var podcast = null;

  // for (var i = 0; i < realPodcasts.length; i++) {
  //   var currentPodcast = realPodcasts[i];

  //   if (currentPodcast.id === frequency) {
  //     podcast = currentPodcast;
  //     break;
  //   }
  // }

  podcast = realPodcasts.find(function (podcast) {
    return podcast.id === frequency;
  });

  renderPodcast(podcast);
}

function renderPodcast(podcast) {
  if (!podcast) {
    globalDivPodcast.textContent = 'Nenhum podcast encontrado';
    return;
  }

  // globalDivPodcast.innerHTML = '';

  // var img = document.createElement('img');
  // img.src = '../img/' + podcast.img;

  // var h2 = document.createElement('h2');
  // h2.textContent = podcast.title;

  // var p = document.createElement('p');
  // p.textContent = podcast.description;

  // globalDivPodcast.appendChild(img);
  // globalDivPodcast.appendChild(h2);
  // globalDivPodcast.appendChild(p);

  // globalDivPodcast.innerHTML =
  //   "<img src='../img/" +
  //   podcast.img +
  //   "' />" +
  //   '<h2>' +
  //   podcast.title +
  //   '</h2>' +
  //   '<p>' +
  //   podcast.description +
  //   '</p>';

  var { img, title, description } = podcast;

  globalDivPodcast.innerHTML = `
    <img src='../img/${img}' />
    <h2>${title}</h2>
    <p>${description}</p>  
  `;
}
