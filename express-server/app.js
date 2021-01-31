const express = require('express');
const cors = require('cors');
const app = express();

let ciudades = [
  'Montevideo', 'Honolulu', 'Rocha', 'Barcelona', 'Paris', 'Hawai'
];
app.get('/ciudades', (req, res) => {
  res.json( 
    ciudades.filter( ciudad => {
      ciudad.toLowerCase().indexOf( req.query.q.toString().toLowerCase() ) > -1
    })
  );
});

app.set('port', 3000);

app.use(cors());
app.use(express.json());

let misDestinos = [];
app.get('/my', (req, res) => {
  res.json(misDestinos);
});

app.post('/my', (req, res) => {
  console.log(req.body);
  misDestinos.push(req.body.nuevo);
  res.json(misDestinos);
});

app.get('/api/translation', (req, res) => {
  res.json([
     {
       lang: req.query.lang,
       key: 'Hola',
       value: `Hola ${req.query.lang}`,
     }
  ]);
});





app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
