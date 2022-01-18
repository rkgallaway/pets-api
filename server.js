'use strict';

console.log('Hello World, From our FIRST Server!!');

// in our servers,we MUST use require instead  of import
// must bring express - just how we do it.  see docs
const express = require('express');

// how it works - see docs
const app = express();

// middleware if necessary goes here AFTER app has been instantiated
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3002;

//require in our json TODAY, will hit weather API tomorrow
const petData = require('./data/pets.json');

// our most basic route.  hit by going to http://localhost:3001
app.get('/', (request, response) => {
  response.send('Hello, From our Server!');
});

// hit route by going to http://localhost:3001/banana
app.get('/banana', (request, response) => {
  response.send('mmmmmm, bananas!')
});

// to hit this route:  http://localhost:3001/sayHello?name=Ryan
app.get('/sayHello', (request, response) => {
  // we access query parameters using the request object
  // specifically:  request.query.<parameter-name>
  let name = request.query.name;

  // notice we can get proof of life.  LOGS show IN TERMINAL
  // console.log(request.query);
  // console.log(name);
  response.status(200).send(`Hello ${name}, from the Server!`);
});

// to hit this route: http://localhost:3001/throw-an-error
app.get('/throw-an-error', (request, response)=> {
  // when something bad happens, you can "throw" an error and the error handler middleware will catch and handle it
  throw 'You did something really, really bad!'
})

// above:  some useful thins
// _____________________

// create route '/pets', your will be '/weather' that uses json to send a tailored response
// hit this route:  http://localhost:3001/pets?species=dog
app.get('/pets', (request, response) => {
  let species = request.query.species;

  // gives proof of life in the TERMINAL
  console.log(species);
  let filteredPets = petData.filter(pet => pet.species === species);
  let groomedPetData = filteredPets.map(pet => new Pet(pet));
  response.send(groomedPetData);
});

// catch all route MUST BE the last route in the file
// we can control the messaging for any mistakenly hit route that doesn't exist
app.get('*', (request, response) => {
  response.status(404).send('these are not the droids you are looking for....');
});

class Pet {
  constructor(pet){
    this.name = pet.name;
    this.breed = pet.breed;
  }
}

// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
