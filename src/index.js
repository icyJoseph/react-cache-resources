import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import FiberHoC from "./FiberHoC";
import { customFetch } from "./fetchers";

const Pokemon = ({ query }) => {
  console.log(query);
  // half-synchronous type of call
  const pokemon = customFetch(query);
  return (
    <div>
      <p>{pokemon.name}</p>
      {pokemon.abilities.map(({ ability: { name } }) => (
        <p key={name}>{name}</p>
      ))}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

// all react components are Fibers now,
// but we control this one with a HoC
const WithFiber = FiberHoC(Pokemon);

function App() {
  const [query, setQuery] = useState("pikachu");
  const _query = useRef("");

  const submitHandler = e => {
    e.preventDefault();
    setQuery(_query.current.value);
  };

  return (
    <>
      <h2>Hello!</h2>
      <form onSubmit={submitHandler}>
        <input type="text" ref={_query} />
        <button>Search</button>
      </form>
      <WithFiber fallback={() => <div>Loading</div>} query={query} />
    </>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
