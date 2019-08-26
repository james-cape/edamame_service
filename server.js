const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Edamame Service';

app.get('/', (request, response) => {
  response.send('This is a microservice for CalorieCombs');
});

app.get('/api/v1/recipes', (request, response) => {
  database('recipes').select()
    .then((recipes) => {
      response.status(200).json(recipes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
