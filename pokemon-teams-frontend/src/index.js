const BASE_URL = "http://localhost:3000/api/v1"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main_doc = document.querySelector("main")

document.addEventListener("DOMContentLoaded", (event) => {
    showCards()
})

const showCards = () => {
    main_doc.innerHTML = ""
    fetchData()
    .then(printEachTrainer)
}

const printEachTrainer = (trainers_array) => {
    trainers_array.data.forEach(element => {
        appendTrainer(element, trainers_array.included)
    })
}

const fetchData = () => {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

const appendTrainer = (trainer, pokemons) => {
    const newTrainerCard = document.createElement("div")
    newTrainerCard.dataset.id = trainer.id
    newTrainerCard.className = "card"
    const newTrainerP = document.createElement("p")
    newTrainerCard.appendChild(newTrainerP).innerText = trainer.attributes.name
    const newTrainerButton = document.createElement("button")
    newTrainerButton.innerText = "Add Pokemon"
    newTrainerButton.setAttribute("data-trainer-id",trainer.id)
    newTrainerButton.addEventListener("click", (event) => addRandomPokemon(event))

    const newTrainerUl = document.createElement("ul")
    const pokemon_belonging = filterTrainerPokemons(trainer, pokemons)
    pokemon_belonging.forEach(element => {
        const newPokeLi = document.createElement("li")
        newPokeLi.innerText = `${element[0]} (${element[1]})`
        newTrainerUl.appendChild(newPokeLi)

        const newReleaseButton = document.createElement("button")
        newReleaseButton.className = "release"
        newReleaseButton.setAttribute("data-pokemon-id", element[2])
        newReleaseButton.innerText = "Release"
        newReleaseButton.addEventListener("click", (event) => deletePokemon(event))
        newPokeLi.append(newReleaseButton)
     })

    main_doc.appendChild(newTrainerCard).append(newTrainerButton, newTrainerUl)
}

const deletePokemon = (event) => {
    const pokemon_id = event.target.dataset.pokemonId
    removeFetchData(pokemon_id)
    .then(showCards)
}

const removeFetchData = (id) => {
    return fetch(POKEMONS_URL + `/${id}`, {
        method: "DELETE"
    })
}

const filterTrainerPokemons = (trainer, pokemons) => {
    const pokemons_list = trainer.relationships.pokemons.data
    const trainers_pokemons = pokemons_list.map(pokemon => {
        return pokemons.find(poke =>{
            return poke.id == pokemon.id
        })
    })
    return trainers_pokemons.map(pokemon => {
        return [pokemon.attributes.nickname, pokemon.attributes.species, pokemon.id]
    })
}

const addRandomPokemon = (event) => {
    const trainer_id = event.target.dataset.trainerId
    fetchAddPokemon(trainer_id)
    .then(showCards)
}

const fetchAddPokemon = (id) => {
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: id
        })
    })
}