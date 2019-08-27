const express = require('express');
const app = express();

const fetch = require('node-fetch');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Edamame Service';

app.get('/', (request, response) => {
  response.send('This is a microservice for CalorieCombs');
});

/* GET recipes from seeds files. */
app.get('/api/v1/recipes', (request, response) => {
  database('recipes').select()
    .then((recipes) => {
      response.status(200).json(recipes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

/* GET recipes from Edamam */
app.get('/recipes', async (req, res) => {
  fetch(`https://api.edamam.com/search?q=${req.query.food}&app_id=${process.env.EDAMAME_APPLICATION_ID}&app_key=${process.env.EDAMAME_APPLICATION_KEY}&to=${req.query.limit}`)
  .then(res => res.json())
  .then(results => {
    let accumulator = []
    results["hits"].forEach( result => {
      database('recipes')
      .insert({
        food: results["q"].toLowerCase().trim(),
        label: result["recipe"]["label"],
        image: result["recipe"]["image"],
        url: result["recipe"]["url"],
        yield: result["recipe"]["yield"],
        calories: result["recipe"]["calories"],
        totalWeight: result["recipe"]["totalWeight"]
      }, ["label"])
      .then(recipe => {
        accumulator.push(recipe[0]["label"])
      })
      return accumulator
    })
  })
  .then(addedRecipes => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({data: `Added recipes to the database`}));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send({ error });
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
