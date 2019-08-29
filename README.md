# EDAMAMSERVICE
## A CALORIECOMBS Microservice

Welcome to EdamamService, an API microservice accompanying CalorieCombs (https://github.com/james-cape/caloriecombs), created by James Cape and Brian Plantico at the Turing School of Software and Design. EdamamService is built using Express (version 4.16.4) for Node.js (version 10.16.2) and also utilizes an ORM (Knex version 0.19.2) to interact with a Postgres database. EdamamService stores recipe information which originates from Edamam's public developer API service (https://developer.edamam.com/edamam-recipe-api). The endpoints which you can access are outlined below with examples of successful requests and successful responses, however, if you have any questions about this API, please reach out to us directly.

#### James Cape: https://github.com/james-cape
#### Brian Plantico: https://github.com/bplantico

### Schema
Edamam's database consists of one Recipes table. The recipes table has columns for:
* id
* label
* image
* url
* yield
* calories
* totalWeight

### Setup and Configuration

Caloriecombs provides five API endpoints to interact with:
#### Queries
```
/api/v1/recipes/food_search?q=food_type
```
```
/api/v1/recipes/servings?q=number_of_servings
```
```
/api/v1/recipes/weight?min=minimum_weight&max=maximum_weight
```
#### Queries
```
/api/v1/recipes/calories?q=food_type
```
```
/api/v1/recipes/max_yield?q=food_type
```

# Configuration
It's not necessary to install and run Caloriecombs or the Edamam Microservice on your local machine since the application is deployed to Heroku and the endpoints outlined below can be accessed without running the application locally, however, if you're interested in working on the code base the following instructions will help you get started:

Fork and/or clone this repository to your local machine.

`cd` into the `edamam_service` directory and run `npm install` and `npm init` from your command line.

To set up the database, run `npm install knex -g` then `npm install knex --save`. Let's connect to PostgreSQL `npm install pg --save`.

Inside of the root EdamamService file, create a `.env` file. You will need to add your :
```
EDAMAME_APPLICATION_ID
EDAMAME_APPLICATION_KEY
```

You're ready to go! Reach out if you have any other questions or concerns.

# Examples Below

```
Request:
https://edamamservice.herokuapp.com/api/v1/recipes/food_search?q=banana

Response:
[
  {
      "id": 1,
      "label": "Basic Homemade Harissa Recipe",
      "image": "https://www.edamam.com/web-img/ec7/ec79b729965ccc98460853d19baf64fa.jpg",
      "url": "http://www.foodrepublic.com/2012/11/27/basic-homemade-harissa-recipe",
      "yield": 10,
      "calories": 2670.03,
      "totalWeight": 821.8,
      "food": "banana"
  },
  {
      "id": 2,
      "label": "Too-Tasty-to-Be-Good-for-You Cauliflower Mac ‘n Cheese",
      "image": "https://www.edamam.com/web-img/46c/46ca37c0a0f05d39f43ffa2bf61e12ed.jpg",
      "url": "http://www.rachaelray.com/recipe/too-tasty-to-be-good-for-you-cauliflower-mac-n-cheese/",
      "yield": 12,
      "calories": 3280.84,
      "totalWeight": 1909.14,
      "food": "banana"
  }
]
```

```
Request:
https://edamamservice.herokuapp.com/api/v1/recipes/servings?q=4

Response:
[
  {
      "id": 10,
      "label": "Braised Brussels Sprouts",
      "image": "https://www.edamam.com/web-img/e2f/e2f869008d208381e3676b439f4bf57f.jpg",
      "url": "http://www.rachaelray.com/recipe/braised-brussels-sprouts/",
      "yield": 4,
      "calories": 803.775,
      "totalWeight": 1202.13,
      "food": "banana"
  },
  {
      "id": 29,
      "label": "Braised Brussels Sprouts",
      "image": "https://www.edamam.com/web-img/e2f/e2f869008d208381e3676b439f4bf57f.jpg",
      "url": "http://www.rachaelray.com/recipe/braised-brussels-sprouts/",
      "yield": 4,
      "calories": 803.775,
      "totalWeight": 1202.13,
      "food": "mushroom"
  },
  {
      "id": 69,
      "label": "Braised Brussels Sprouts",
      "image": "https://www.edamam.com/web-img/e2f/e2f869008d208381e3676b439f4bf57f.jpg",
      "url": "http://www.rachaelray.com/recipe/braised-brussels-sprouts/",
      "yield": 4,
      "calories": 803.775,
      "totalWeight": 1202.13,
      "food": "peanut butter"
  },
  {
      "id": 49,
      "label": "Braised Brussels Sprouts",
      "image": "https://www.edamam.com/web-img/e2f/e2f869008d208381e3676b439f4bf57f.jpg",
      "url": "http://www.rachaelray.com/recipe/braised-brussels-sprouts/",
      "yield": 4,
      "calories": 803.775,
      "totalWeight": 1202.13,
      "food": "salmon"
  }
]
```

```
Request:
https://edamamservice.herokuapp.com/api/v1/recipes/weight?min=500&max=900

Response:
[
  {
      "id": 1,
      "label": "Basic Homemade Harissa Recipe",
      "image": "https://www.edamam.com/web-img/ec7/ec79b729965ccc98460853d19baf64fa.jpg",
      "url": "http://www.foodrepublic.com/2012/11/27/basic-homemade-harissa-recipe",
      "yield": 10,
      "calories": 2670.03,
      "totalWeight": 821.8,
      "food": "banana"
  }
]
```

```
Request:
https://edamamservice.herokuapp.com/api/v1/recipes/calories?q=banana

Response:
[
  {
      "avg": 2628.07362670898
  }
]
```

```
Request:
https://edamamservice.herokuapp.com/api/v1/recipes/max_yield?q=banana

Response:
{
  "max_yield": 18
}
```
