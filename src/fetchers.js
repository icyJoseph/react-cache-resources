import cache from "./cache";
import { fetchPokemon } from "./api";

export const customFetch = query => {
  // check if we have cached that query
  if (cache[query]) {
    return cache[query];
  }
  // if not, then throw the query!
  throw query;
};

// fake some network delay
function delay(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 2000);
  });
}

// fetch the query, and after a delay, mutate the cache!
export const fetchWithCache = query =>
  fetchPokemon(query)
    .then(delay)
    .then(data => (cache[query] = data));
