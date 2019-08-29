const express = require('express');
const app = express();
var router = express.Router();

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

/* GET average calories for a food. */
app.get('/api/v1/recipes/calories', (request, response) => {
  database('recipes').where({
    food: request.query.q
  }).avg('calories')
  .then((calories) => {
    response.setHeader("Content-Type", "application/json");
    response.status(200).json(calories);
  })
  .catch((error) => {
    response.setHeader("Content-Type", "application/json");
    response.status(400).send({ error: 'Include food in query' });
  });
});

/* GET recipes from food query. */
app.get('/api/v1/recipes/food_search', (request, response) => {
  database('recipes').where({
    food: request.query.q
  }).select()
  .then((recipes) => {
    response.setHeader("Content-Type", "application/json");
    response.status(200).json(recipes);
  })
  .catch((error) => {
    response.setHeader("Content-Type", "application/json");
    response.status(400).send({ error: 'Include food in query' });
  });
});

/* GET recipes from servings query. */
app.get('/api/v1/recipes/servings', (request, response) => {
  database('recipes').where({
    yield: request.query.q
  }).select()
  .then((recipes) => {
    response.setHeader("Content-Type", "application/json");
    if (recipes.length == 0) {
      response.status(400).send({ error: 'No matches found for that number' });
    } else {
      response.status(200).json(recipes);
    }
  })
  .catch((error) => {
    response.setHeader("Content-Type", "application/json");
    response.status(400).send({ error: 'Include servings in query' });
  });
});

/* GET recipes from weight range query. */
app.get('/api/v1/recipes/weight', (request, response) => {
  database('recipes')
  .where('totalWeight', '>=', request.query.min)
  .where('totalWeight', '<', request.query.max)
  .select()
  .then((recipes) => {
    response.setHeader("Content-Type", "application/json");
    if (recipes.length == 0) {
      response.status(400).send({ error: 'No matches found for that weight range' });
    } else {
      response.status(200).json(recipes);
    }
  })
  .catch((error) => {
    response.setHeader("Content-Type", "application/json");
    response.status(400).send({ error: 'Include max and min weight in query' });
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
        yield: parseFloat(result["recipe"]["yield"]),
        calories: parseFloat(result["recipe"]["calories"]),
        totalWeight: parseFloat(result["recipe"]["totalWeight"])
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

module.exports = router;
