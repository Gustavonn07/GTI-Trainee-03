import gerarPokemon from './gerarPokemons.js';

const root = document.getElementById('root');

async function renderizaPokemon() {
    try {
        const pokemons = await gerarPokemon();
        root.innerHTML = pokemons.map(pokemon => {

            return pokemon.type2 ? `
                <div class="hover:scale-105 relative duration-200 hover:shadow-2xl w-64 h-96 mt-10 flex flex-col items-center rounded-2xl shadow-xl bg-slate-100">
                        <h5 class="absolute right-5 top-4 text-xl font-semibold text-slate-900">${pokemon.id}</h5>
                    <img src=${pokemon.imagem} alt=${pokemon.nome} class="h-1/2">
                    
                    <div class="flex flex-col bg-red-500 rounded-b-2xl border-t-gray-900 border-t-4 w-full h-1/2">
                        <h3 class="text-3xl my-3 text-center text-slate-100">${pokemon.nome}</h3>
                        <div class="flex gap-8 justify-center">
                            <h4 class="text-slate-800 w-20 h-7 text-center bg-gray-100 rounded-3xl">${pokemon.type}</h4>
                            <h4 class="text-slate-800 w-20 h-7 text-center bg-gray-100 rounded-3xl">${pokemon.type2}</h4>
                        </div>
                        <button onclick="addPokemon()" data-pokemon-id=${pokemon.id} class="mt-auto pb-3 hover:scale-x-110 focus:scale-x-110 active:scale-x-105 duration-200 text-xl mx-auto text-center text-slate-800 w-1/2 bg-slate-100 rounded-t-xl">Adicionar</button>
                    </div>
                </div> 

            ` : `
                <div class="hover:scale-105 relative duration-200 hover:shadow-2xl w-64 bg-slate-100 h-96 mt-10 rounded-2xl shadow-xl flex flex-col items-center">
                        <h5 class="absolute right-5 top-4 text-xl font-semibold text-slate-900">${pokemon.id}</h5>
                        <img src=${pokemon.imagem} alt=${pokemon.nome} class="h-1/2">
                        
                        <div class="flex flex-col bg-red-500 rounded-b-2xl border-t-gray-900 border-t-4 w-full h-1/2">
                            <h3 class="text-3xl my-3 text-center text-slate-100">${pokemon.nome}</h3>
                            <div class="mx-auto">
                                <h4 class="text-slate-800 w-20 h-7 text-center bg-gray-100 rounded-3xl">${pokemon.type}</h4>
                            </div>
                            <button onclick="addPokemon()" data-pokemon-id=${pokemon.id} class="mt-auto mx-auto pb-3 hover:scale-x-110 focus:scale-x-110 active:scale-x-105 duration-200 text-xl text-slate-800 w-1/2 bg-slate-100 rounded-t-xl">Adicionar</button>
                        </div>
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