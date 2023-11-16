import gerarPokemon from './gerarPokemons.js';

const root = document.getElementById('root');

async function renderizaPokemon() {
    try {
        const pokemons = await gerarPokemon();
        root.innerHTML = pokemons.map(pokemon => {

            return pokemon.type2 ? `
                <div class="w-64 bg-slate-500 h-96 mx-auto mt-10 flex flex-col items-center">
                    <img src=${pokemon.imagem} alt=${pokemon.nome} class="h-1/2">
                    
                    <div class="flex flex-col">
                        <h3 class="text-3xl mb-3 text-center">${pokemon.nome}</h3>
                        <div class="flex gap-8 justify-center">
                            <h4>${pokemon.type}</h4>
                            <h4>${pokemon.type2}</h4>
                        </div>
                        <button class="mt-6 text-xl text-center">Adicionar</button>
                    </div>
                </div> 

            ` : `
                <div class="w-64 bg-slate-500 h-96 mx-auto mt-10 flex flex-col items-center">
                        <img src=${pokemon.imagem} alt=${pokemon.nome} class="h-1/2">
                        
                        <div class="flex flex-col">
                            <h3 class="text-3xl mb-3 text-center">${pokemon.nome}</h3>
                            <div>
                                <h4 class="text-center">${pokemon.type}</h4>
                            </div>
                            <button class="mt-6 text-xl">Adicionar</button>
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
