//garante que todos os elementos estejam em tela antes de começar
window.addEventListener('load', start)

var globalNames = ['Um', 'Dois', 'Três', 'Quatro']
var inputName = null
var isEditing = false
var currentIndex = null

function start() {
  console.log("Olá, mundo")
  inputName = document.querySelector('#inputName')
  preventFormSubmit()
  activateInput()
  render()
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
}



//EXEMPLO DE INSERÇÃO DE DADOS

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName)  //colocando em uma lista
    console.log(globalNames)
  }

  function updateName(newName) {
    console.log(newName)
    console.log(currentIndex)
    globalNames[currentIndex] = newName

  }

  function handleTyping(event) {
    //dupla exclamação, tornamos algo verdaderável como true, e falseável como false
    var hasText = !!event.target.value && event.target.value.trim()

    //se não houver texto ...
    if (!hasText) {
      return
    }
    //mostra o event => console.log(event)
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
        console.log("editando")
      } else {
        console.log("inserindo")
        insertName(event.target.value)
      }

      render()
      isEditing = false
      clearInput()
    }
  }
  //permite que ao iniciar a page, o seletor de texto esteja no input
  inputName.focus()
  //escutar a digitação do user
  inputName.addEventListener('keyup', handleTyping)
}


//Inserir de forma dinâmica os dados na lista
function render() {

  function createDeleteButton(index) {
    function deleteName() {
      //removendo o elemento do vetor
      console.log(index)
      globalNames.splice(index, 1)
      render()
    }

    var button = document.createElement('button')
    button.textContent = 'x'
    button.classList.add('deleteButton')

    button.addEventListener('click', deleteName)

    return button
  }

  function createSpan(name, i) {
    function editItem() {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = i
    }

    var span = document.createElement('span')
    span.classList.add('clickable')
    span.textContent = name
    span.addEventListener('click', editItem)
    return span
  }

  var divNames = document.querySelector('#names')
  divNames.innerHTML = ''
  //Criar ul, e fazer n li's, conforme tamanho do vetor globalNames
  var ul = document.createElement('ul')

  for (let i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i]
    var li = document.createElement('li')

    var button = createDeleteButton(i)

    var span = createSpan(currentName, i)

    li.appendChild(button)
    li.appendChild(span)
    ul.appendChild(li)
  }
  divNames.appendChild(ul)
  clearInput()
}


function clearInput() {
  inputName.value = ''
  inputName.focus()
}




