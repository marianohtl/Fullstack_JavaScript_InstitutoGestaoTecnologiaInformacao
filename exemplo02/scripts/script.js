console.log("Olá, mundo!")

var randomText = document.querySelector('p');
randomText.textContent = "Heeeey :o";

var a = 2
var b = 2

if (a > b) {
  console.log(a + " é maior que " + b);
} else {
  if (a < b) {
    console.log(b + " é maior que " + a);
  } else {
    console.log(a + " é igual " + b);
  }
}


if (a > b) console.log(a + " é maior que " + b);
else if (a < b) console.log(b + " é maior que " + a);
else console.log(a + " é igual " + b);

var dia = 1;
var resposta;
switch (dia) {
  case 1: resposta = "Domingo"; break;
  case 2: resposta = "Segunda"; break;
  case 3: resposta = "Terça"; break;
  case 4: resposta = "Quarta"; break;
  case 5: resposta = "Quinta"; break;
  case 6: resposta = "Sexta"; break;
  case 7: resposta = "Sábado"; break;
  default: resposta = "Dia Inválido"; break;
}

console.log(dia)

var resposta2 = a > b ? 'maior' : a < b ? 'menor' : 'igual';

console.log(resposta2)


var diaSemana = dia === 1 ? 'Domingo' : dia === 2 ? 'Segunda' : dia === 3 ? 'Terça' : dia === 4 ? 'Quarta' : dia === 5 ? 'Quinta' : dia === 6 ? 'Sexta' : dia === 7 ? "Sábado" : ' Dia inválido'


var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual
  numeroAtual++
}

numeroAtual = 1
somatorio = 0

do {
  somatorio += numeroAtual
  numeroAtual++
} while (numeroAtual == 10)

somatorio = 0
for (nAtual = 1; nAtual <= 10; nAtual++) {
  somatorio = nAtual;
}