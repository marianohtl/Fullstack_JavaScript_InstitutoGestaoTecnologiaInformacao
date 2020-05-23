window.addEventListener('load', start);

function start() {
  var inputRange = document.querySelector('#inputRange');

  inputRange.addEventListener('input', handleInputRangeChange);
  showPodcastFromFrequency('87.5');
}

function handleInputRangeChange(event) {
  var currentFrequency = event.target.value;

  var inputFrequency = document.querySelector('#inputFrequency');
  inputFrequency.value = currentFrequency;

  showPodcastFromFrequency(currentFrequency);
}

function showPodcastFromFrequency(frequency) {
  var divPodcasts = document.querySelector('#divPodcasts');

  // ES5
  // for (var i = 0; i < realPodcasts.length; i++) {
  //   var currentPodcast = realPodcasts[i];

  //   if (currentPodcast.id === frequency) {
  //     hasPodcast = true;
  //     podcast = currentPodcast;
  //   }
  // }

  // ES6+
  var currentPodcast = realPodcasts.find(function (podcast) {
    return frequency === podcast.id;
  });

  console.log(currentPodcast);

  if (!!currentPodcast) {
    renderPodcast2(currentPodcast);
  } else {
    divPodcasts.textContent = 'Nenhum podcast encontrado!';
  }
}

function renderPodcast(podcast) {
  divPodcasts.innerHTML = '';

  const img = document.createElement('img');
  img.src = '../img/' + podcast.img;

  const h2 = document.createElement('h2');
  h2.textContent = podcast.title;

  const p = document.createElement('p');
  p.textContent = podcast.description;

  divPodcasts.appendChild(img);
  divPodcasts.appendChild(h2);
  divPodcasts.appendChild(p);
}

function renderPodcast2(podcast) {
  const { img, title, description } = podcast;

  divPodcasts.innerHTML = `
    <img src='../img/${img}' />
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  divPodcasts.innerHTML =
    // prettier-ignore
    "<img src='../img/" + podcast.img + "'/>" +
    "<h2>" + podcast.title + "</h2>"  +
    '<p>' + podcast.description + '</p>';
}
