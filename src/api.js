const delayData = duration => data =>
  new Promise(resolve => {
    setTimeout(() => resolve(data), duration);
  });

export const fetchPokemon = query =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
    .then(res => res.json())
    .then(delayData(1 + Math.random() * 1000));
