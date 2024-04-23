#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    return;
  }

  const filmData = JSON.parse(body);
  const charactersUrls = filmData.characters;

  // Function to fetch character names and print them
  function fetchAndPrintCharacter(index) {
    if (index >= charactersUrls.length) {
      return;
    }

    const characterUrl = charactersUrls[index];
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

      // Fetch next character recursively
      fetchAndPrintCharacter(index + 1);
    });
  }

  // Start fetching characters
  fetchAndPrintCharacter(0);
});

