import cache from "./cache";
import { fetchPokemon } from "./api";

export const customFetch = query => {
  if (cache[query]) {
    return cache[query];
  }

  throw query;
};

function delay(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 5000);
  });
}

export const fetchWithCache = query =>
  fetchPokemon(query)
    .then(delay)
    .then(data => (cache[query] = data));
