const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");
document.addEventListener("DOMContentLoaded", () => {
  fetchAllTrainers(TRAINERS_URL);
});

function fetchAllTrainers(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(data => iterateThroughTrainers(data));
}

function iterateThroughTrainers(trainers) {
  for (let trainer of trainers) {
    showTrainerToDom(trainer);
  }
}

function showTrainerToDom(trainer) {
  trainerDiv = document.createElement("div");
  trainerDiv.className = "card";
  trainerDiv.id = trainer.id;
  main.append(trainerDiv);

  const trainerP = document.createElement("p");
  trainerP.innerText = trainer.name;

  const addBtn = document.createElement("button");
  addBtn.innerText = "Add Pokemon";
  addBtn.setAttribute("data-trainer-id", trainer.id);
  addPokemonHandler(addBtn);

  const pokemonsUl = document.createElement("ul");
  pokemonsUl.id = `trainer-id-${trainer.id}`;

  trainerDiv.append(trainerP, addBtn, pokemonsUl);

  for (let pokemon of trainer.pokemons) {
    showPokemonToDom(pokemon);
  }
}

function showPokemonToDom(pokemon) {
  const pokemonsUl = document.getElementById(
    `trainer-id-${pokemon.trainer_id}`
  );
  const pokemonLi = document.createElement("li");
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
  pokemonsUl.appendChild(pokemonLi);

  const releaseBtn = document.createElement("button");
  releaseBtn.innerText = "Release";
  releaseBtn.className = "release";
  releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
  pokemonLi.appendChild(releaseBtn);
  releasePokemonHandler(releaseBtn, pokemon);
}

function releasePokemonHandler(releaseBtn, pokemon) {
  releaseBtn.addEventListener("click", event => {
    fetch(POKEMONS_URL + `/${pokemon.id}`, { method: "DELETE" }).then(() =>
      event.target.parentElement.remove()
    );
  });
}

function addPokemonHandler(addBtn) {
  addBtn.addEventListener("click", event => {
    const trainerData = {
      trainer_id: event.target.getAttribute("data-trainer-id")
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trainerData)
    };

    fetch(POKEMONS_URL, configObj)
      .then(resp => resp.json())
      .then(data => showPokemonToDom(data));
  });
}
// #=> Example Response
// {
//   "id":147,
//   "nickname":"Gunnar",
//   "species":"Weepinbell",
//   "trainer_id":1
// }
