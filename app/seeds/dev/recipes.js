exports.seed = function(knex) {
  return knex('recipes').del() // delete all recipes
  .then(() => {
    return Promise.all([
      knex('recipes').insert([
        {
          label: 'Triple Cheese Pizza',
          image: 'https://www.totinos.com/wp-content/uploads/2018/09/totinos-party-pizza-triple-cheese-460x460.png',
          url: 'https://www.totinos.com/products/triple-cheese-party-pizza/',
          yield: 2,
          calories: 680,
          totalWeight: 495
        },
        {
          label: 'Turkey with Potatoes',
          image: 'https://cafedelites.com/wp-content/uploads/2016/11/Herb-Roast-Turkey-13.jpg',
          url: 'https://cafedelites.com/one-pan-juicy-herb-roasted-turkey/',
          yield: 5,
          calories: 500,
          totalWeight: 875
        },
        {
          label: 'Grilled Vegetables',
          image: 'http://www.howsweeteats.com/wp-content/uploads/2018/08/grilled-veg-bread-I-howsweeteats.com-18.jpg',
          url: 'https://www.foodnetwork.com/recipes/giada-de-laurentiis/grilled-vegetables-recipe-1942208',
          yield: 3,
          calories: 150,
          totalWeight: 345
        }
      ])
      .then(recipe => {
        console.log('Seeded Recipe')
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]) // end return Promise.all
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
