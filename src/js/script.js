import gerarPokemon from './gerarPokemons.js';

const root = document.getElementById('root');

async function renderizaPokemon() {
    try {
        const pokemons = await gerarPokemon();

        const infoPokemons = pokemons.map(pokemon => {
            const id = pokemon.id;
            const nome = pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1);
            const type1 = pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1);
            const type2 = pokemon.type2 ? pokemon.type2.charAt(0).toUpperCase() + pokemon.type2.slice(1) : '';

            return type2 ? {id:id, nome:nome, type1:type1, type2:type2} : {id:id, nome:nome, type1:type1};
        });

        root.innerHTML = infoPokemons.map(pokemon => {
            return pokemon.type2 ? `
                <p class="text-red-500">${pokemon.nome}, ${pokemon.type1}, ${pokemon.type2}</p> 
            ` : `
                <p class="text-red-500">${pokemon.nome}, ${pokemon.type1}</p> 
            `;
        }).join('');

        
        console.log(pokemons);

    } catch (error) {
        console.error(error);
    }
}

renderizaPokemon();
