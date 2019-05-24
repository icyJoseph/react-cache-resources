import cache from "./cache";
import { fetchPokemon } from "./api";

export function createResource(name, asyncResource) {
  cache[name] = cache[name] || {};
  const cached = cache[name];
  return {
    cached,
    read(value) {
      if (cached[value]) {
        return cached[value];
      }
      throw asyncResource(name).then(result => {
        cached[value] = result;
      });
    }
  };
}
