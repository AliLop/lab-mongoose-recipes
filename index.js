const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    console.log(`connection made`)
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

/* CREATE
  Recipe.create({
    title: 'Paella',
    cuisine: 'Spanish'
  }).then((resp) => {
      console.log(`${resp[0].title}`)
  }).catch((err) => {
      console.log(`Error occurred ${err}`)
  })


//MANUALLY IMPORTED ON MONGOOSE SINCE TERMINAL DOES NTO WORK FOR ME
//mongoimport --db restaurants --collection restaurants --drop --file primer-dataset.json

Recipe.insertMany(data)
*/

const promise1 = Recipe.find({}, 'title')
  .then((titles) => {
    console.log(titles)
    //mongoose.connection.close();
  })
  

const promise2 =  Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((updatedDuration) => {
        console.log (`Updated duration on ${updatedDuration}!`)
        //mongoose.connection.close();
        }) 

const promise3 = Recipe.deleteOne({ title: 'Carrot Cake'})
    .then(() => {
        console.log(`Deleted!`)  
        //mongoose.connection.close();
    })

Promise.all([promise1, promise2, promise3]).then(() => {
    console.log(`all promises are done`)
    mongoose.connection.close();
}).catch((err) => {
    console.log(`Error ${err}`)
})
