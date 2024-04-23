#!/usr/bin/node
const request = require('request');

const movieId = parseInt(process.argv[2], 10);
const apiUrl = 'https://swapi.dev/api/films/';

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    return;
  }

  const filmsData = JSON.parse(body);
  const film = filmsData.results.find(film => film.episode_id === movieId);

  if (!film) {
    console.error('Movie with ID', movieId, 'not found.');
    return;
  }

  const charactersUrls = film.characters;
  charactersUrls.forEach(characterUrl => {
    request(characterUrl, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
        return;
      }

      if (response.statusCode !== 200) {
        console.error('Request failed with status code:', response.statusCode);
        return;
      }

      const characterData = JSON.parse(body);
      console.log(characterData.name);
    });
  });
});

