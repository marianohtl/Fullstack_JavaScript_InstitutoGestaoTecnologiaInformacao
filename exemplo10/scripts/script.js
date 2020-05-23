
window.addEventListener('load', () => {
  doFetch();
  executeDivisionPromise();
  doFetchAsync();
});

async function doFetch() {
  //promisse é um bloco de código que vai ser executado em algum momento, aonde passamos funções por parâmetro, para quando essa função estiver resolvida
  //const tmariano = fetch('https://api.github.com/users/tmariano');
  //o then é o então que é executado quando a função está resolvida
  // no fetch temos dois callsbakc, aonde o primeiro tem os dados binários e no segundo tem os dados em json 
  const tmariano = fetch('https://api.github.com/users/tmariano')
    .then(res => {
      res.json()
        .then(data => {
          console.log(data);
          showData(data);
        })
    }).catch(error => {
      console.log('Erro na requisição.');
    });
}



//função fetch assincrona
async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/tmariano');
  const json = await res.json();
  showData(json);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.updated_at;
}

//promisse é uma promessa de excução que pode não ser comprida
//quando resolvida capturamos o que chegou para nós no then 1ª dado binario, fazemos uma chamada de json par conversão e que por sua vez retorna outra promisse, esta com os dados em json
//quando ok vem para o then
//quando falha, é o catch

//async awayt, ele não modifica o comportamento das promisses, só melhora a legibilidade do código

//vamos criar uma promisse
function divisionPromisse(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  });
}




//chamada de um promise com async
async function executeDivisionPromise() {
  const division = await divisionPromisse(12, 2);
}

//chamada de um promise
divisionPromisse(12, 2).then(result => {
  console.log(result);
}).catch(erroMessage => { console.log('Falha na divisão. ' + erroMessage) });

