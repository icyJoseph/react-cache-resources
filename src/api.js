export const fetchPokemon = query =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`).then(res => res.json());
