const express = require('express');
const app = express();

const fetch = require('node-fetch');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var Recipe = require('./models').Recipe;


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Edamame Service';

app.get('/', (request, response) => {
  response.send('This is a microservice for CalorieCombs');
});

/* GET recipes from seeds files. */
// app.get('/api/v1/recipes', (request, response) => {
//   database('recipes').select()
//     .then((recipes) => {
//       response.status(200).json(recipes);
//     })
//     .catch((error) => {
//       response.status(500).json({ error });
//     });
// });

/* GET recipes from Edamam */
app.get('/recipes', async (req, res) => {
  fetch(`https://api.edamam.com/search?q=banana&app_id=${process.env.EDAMAME_APPLICATION_ID}&app_key=${process.env.EDAMAME_APPLICATION_KEY}&to=20`)
  .then(res => res.json())
  .then(results => {
    results["hits"].forEach( result => {
      Recipe.create({
        food: results["q"].toLowerCase().trim(),
        label: result["recipe"]["label"],
        image: result["recipe"]["image"],
        url: result["recipe"]["url"],
        yield: result["recipe"]["yield"],
        calories: result["recipe"]["calories"],
        totalWeight: result["recipe"]["totalWeight"]
      })
    })
    // let results_count = results.hits.length
    console.log("2==================================")
    console.log("2==================================")
    console.log(results.hits.length)
    console.log("2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log("2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .then(message => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({message: `${results_count} recipes added.`}));
    })


  })

  // .then(body => JSON.parse(body)["results"][0]["geometry"]["location"])
  // .then(coordinates => {
  //   fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coordinates["lat"]},${coordinates["lng"]}`)
  //   .then(response => response.text())
  //   .then(body => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(200).send(JSON.stringify({data: new edamamSerializer(body,req.query.location)}));
  //   })
  // })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
