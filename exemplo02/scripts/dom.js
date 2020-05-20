console.log('Olaar')


var title = document.querySelector('h1')
title.textContent = "DANONE!!!"

//var momo = document.querySelector('.testeClass');
//momo.textContent = "Momo eu te amo"

var momo1 = document.querySelector('#testeId');

momo1.textContent = "MUIIIITÃO"

var personalDataArray = document.querySelectorAll('.testeClass')

personalDataArray = Array.from(personalDataArray)

for (var i = 0; i < personalDataArray.length; i++) {
  personalDataArray[i].textContent = "Eu amo o momo mais"
  personalDataArray[i].style.color = 'pink';
}

