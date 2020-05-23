console.log('Olar')

window.addEventListener('load', function () {
  const timer = document.querySelector('#timer');

  let count = 0;
  //temos que guardar o set interval para poder usar depois
  const interval = this.setInterval(() => {
    timer.textContent = ++count;

    if (count === 10) {
      this.clearInterval(interval);
    } else {
      if (count % 5 === 0) {
        setTimeout(() => {
          timer.textContent = count + ',5';
        }, 500);
      }
    }
  }, 1000);
});



