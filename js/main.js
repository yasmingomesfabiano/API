console.log("Funcionou.");
const url= "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
const pokemonList= document.getElementById("lista-pokemon")

function convertPokemonToli(pokemon) {
    return `
        <li class="pokemon ${pokemon.types[0].type.name}">
            <p class="nome">${pokemon.name}</p>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="pokemon">
        </li>
    `;
}

function getpokemonDetails(pokemon){
    return fetch(pokemon.url)
        .then((response)=>response.json())
}

fetch(url)
    .then((response)=>response.json())
    .then((jsonresponse)=>jsonresponse.results)
    .then((list)=> list.map(getpokemonDetails))
    .then((details)=> Promise.all(details))
    .then((newList)=> pokemonList.innerHTML=newList.map(convertPokemonToli).join(""))
    .catch((error)=>console.log(error))