
window.addEventListener('load', start)


function start() {
  console.log("Start")
}


var inputPrincipalNodeList = document.querySelectorAll('.rangeFormat')
var inputPrincipalArray = Array.from(inputPrincipalNodeList)

var inputR = document.getElementById('R')
var valueR = document.getElementById('vR')

var inputG = document.getElementById('G')
var valueG = document.getElementById('vG')

var inputB = document.getElementById('B')
var valueB = document.getElementById('vB')

inputR.addEventListener("input", changeRange)
inputG.addEventListener("input", changeRange)
inputB.addEventListener("input", changeRange)


function changeRange() {
  valueR.value = inputR.value;
  valueG.value = inputG.value;
  valueB.value = inputB.value;

  console.log(inputPrincipalArray)
  var color = `rgb(${inputR.value} , ${inputG.value}, ${inputB.value})`
  // inputPrincipal.map(function (e) {
  //   console.log(e)
  // })
  inputPrincipalArray.map(function (item) {
    item.style.backgroundColor = color
  })
}

