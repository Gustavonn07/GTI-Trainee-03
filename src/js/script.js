import gerarPokemon from './gerarPokemons.js';

const root = document.getElementById('root');

async function renderizaPokemon() {
    try {
        const pokemons = await gerarPokemon();

        // Testes
        const url = "https://assets.pokemon.com/assets/cms2/img/misc/countries/pt/country_detail_pokemon.png"

        root.innerHTML = pokemons.map(pokemon => {
            return pokemon.type2 ? `
                <div class="w-64 bg-slate-500 h-72 mx-auto mt-10 flex flex-col items-center gap-5">
                    <img src=${url} alt="" class="w-full h-1/2">
                    
                    <h3 class="text-2xl">${pokemon.nome}</h3>
                    <div class="flex gap-5">
                        <h4>${pokemon.type}</h4>
                        <h4>${pokemon.type2}</h4>
                    </div> 
                </div> 

            ` : `
            <div class="w-64 bg-slate-500 h-72 mx-auto mt-10 flex flex-col items-center gap-5">
            <img src=${url} alt="" class="w-full h-1/2">
            
            <h3 class="text-2xl">${pokemon.nome}</h3>
            <div class="">
                <h4>${pokemon.type}</h4>
            </div> 
        </div> 
            `;
        }).join('');

    } catch (error) {
        console.error(error);
        // Criar uma página 404
    }
}

renderizaPokemon();
