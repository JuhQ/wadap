import giphy from 'giphy-js-sdk-core';

const API_KEY = 'gk7YB2ze8IXV91LGq06Kj9qdQ9HiEO06';

const client = giphy(API_KEY);


export const search = q =>
  client.search('gifs', {q});

export const trending = () =>
  client.trending('gifs', {});
