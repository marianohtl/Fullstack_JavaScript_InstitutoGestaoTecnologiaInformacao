var express = require("express");

var app = express();

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

app.listen(3000, function () {
  console.log("API Started!");
})


app.get('/testAll', (req, res) => {
  res.send(req.method);
});

//  o e da rota é opcional
app.get('/teste?', (_, res) => {
  res.send('/teste? > funciona /test e /teste ');
});

//posso colocar quantos z eu quizer a partir de buzz por conta do +
app.get('/buzz+', (_, res) => {
  res.send('/buzz =>  funciona com /buzz e /buzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
});

//funciona com qualquer coisa no lugar do *
app.get('/one*Blue', (_, res) => {
  res.send('/one*Blue =>  funciona com qualquer coisa no lugar do *');
});

//(ing) é opcional 
app.post('/test(ing)?', (_, res) => {
  res.send('/test(ing)? =>  funciona com /test ou /testing   ing é opcional');
});


//Expressão Regular
app.get(/.*Red$/, (_, res) => {
  res.send('(/.*Red$/ => qualquer coisa na expressão regular ele entende ');
});



//get com parâmetro
app.get('/parametro/:id/:outroParam', (req, res) => {
  res.send(req.params.id + " " + req.params.outroParam);
});


//next, várias callbacks podem ser executadas
app.get('/TestMultiplesHandles', (_, res, next) => {
  console.log('First method');
  res.send("resposta no console")
  next()
}, (_, res) => {
  console.log('Second method');
  res.end();
});




//callbacks por array 
const callback1 = (req, res, next) => {
  console.log('CallBack 1');
  res.send("resposta no console")
  next()
}
const callback2 = (req, res, next) => {
  console.log('CallBack 2');
  res.end();
}


app.get('/TestMultiplesHandlesArray', [callback1, callback2]);


//várias rotas podem ser alinhadas no método route
app.route('/testRoute')
  .get((req, res) => {
    res.end();
  })
  .post((req, res) => {
    res.end();
  })
  .delete((req, res) => {
    res.end();
  });


//Seção Middelwares - Nível da Apliação

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use('/testMiddleware', (req, res, next) => {
  console.log('/testMiddleware');
  console.log(res);
  console.log(req);
  if (req.method === 'GET') {
    next();
  } else {
    res.end();
  }
});

app.get('/testMiddleware', (req, res) => {
  res.send('GET /testMiddleware');
});



//Seção Tratamento de Erros

app.get('/', function (req, res) {
  throw new Error('Error');
});


//assincronas, precisam de um tratamento com ty cath para não ficar em loop na req, usando sempre o next  
app.post('/', async (req, res) => {
  throw new Error('Error Message');
  try {
    throw new Error('Error message');
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('An error ocurred!');
});



// Gravação de Logs -> >>> instale o winston <<<

const winston = require('winston');
app.use(express.json());

//servir arquivos estáticos com o Express   >>
app.use(express.static('public'));  //http://localhost:3000/100.jpg

//nome virtual > images  http://localhost:3000/images/100.jpg
app.use('/images', express.static('public'));

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});


//level silly é o último level, que pega todos os logs
const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'grades-control-api.log' })
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  )
});

logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.silly('Silly log');
logger.log('info', 'Hello with parameter!');

// app.listen(3000, async () =>{
//     console.log('API started')
// });





