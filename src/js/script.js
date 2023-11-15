import gerarPokemon from './gerarPokemons.js';

const root = document.getElementById('root');

async function renderizaPokemon() {
    try {
        const pokemons = await gerarPokemon();

        root.innerHTML = pokemons.map(pokemon => {
            return pokemon.type2 ? `
                <p class="text-red-500">${pokemon.nome}, ${pokemon.type}, ${pokemon.type2}</p> 
            ` : `
                <p class="text-red-500">${pokemon.nome}, ${pokemon.type}</p> 
            `;
        }).join('');

    } catch (error) {
        console.error(error);
        // Criar uma página 404
    }
}

renderizaPokemon();
