import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import FiberHoC from "./FiberHoC";
import { fetchPokemon } from "./api";
import { createResource } from "./resource";

import "./bootstrap.min.css";

const Loading = () => (
  <div className=" spinner-grow text-danger" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const Pokemon = ({ query }) => {
  console.log(query);
  // half-synchronous type of call
  const resource = createResource(query, fetchPokemon);
  const pokemon = resource.read();
  return (
    <div className="card" style={{ width: "15rem" }}>
      <h5 className="card-header text-capitalize">{pokemon.name}</h5>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="card-img-top"
      />
      <div className="card-body">Game Index: {pokemon.id}</div>
      <ul className="list-group list-group-flush">
        {pokemon.abilities.map(({ ability: { name } }) => (
          <li key={name} className="list-group-item text-capitalize">
            {name}
          </li>
        ))}
      </ul>
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
    setQuery(_query.current.value.trim());
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="display-3">Gotta cache 'em all</h1>
      </div>
      <div className="row justify-content-center">
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
          <div className="form-group">
            <input type="text" className="form-control" ref={_query} />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      <div className="row justify-content-center">
        <WithFiber fallback={<Loading />} query={query} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
