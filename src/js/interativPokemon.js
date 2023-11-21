const pokeTime = document.getElementById('pokeTime__ul');
const main = document.getElementById('main');
let repetidoPode = false;
let del = false;
let pokemonIdExistentes = [];

function repetidos() {
    repetidoPode = !repetidoPode;
    
    const btnRep = document.getElementById('btn__rep');

    if (repetidoPode) {
        btnRep.classList.add('bg-green-200');
        btnRep.classList.remove('bg-red-200');

    } else {
        btnRep.classList.remove('bg-green-200');
        btnRep.classList.add('bg-red-200');
    }
};

async function addPokemon() {
   
    let promise = new Promise((resolve, reject) => {
        const buttons = document.querySelectorAll('[data-pokemon-id]');

        if (buttons.length === 0) {
            console.warn('Nenhum botão encontrado com o atributo data-pokemon-id.');
            reject('Nenhum botão encontrado com o atributo data-pokemon-id.');
        }
        
        const pokemonId = event.target.dataset.pokemonId;
        resolve(pokemonId);
    });

    pokemonIdExistentes = Array.from(pokeTime.children).map(li => li.innerText.trim());

    if (!repetidoPode) {
        if (pokeTime.children.length < 6 && !pokemonIdExistentes.includes(await promise)) {
            pokeTime.innerHTML += `<li class="pokeTime__li w-10 h-5 relative before:block before:w-10 before:h-5 before:absolute before:-bottom-5 before:rounded-b-full before:bg-slate-300 rounded-t-full bg-red-400 text-center">${await promise}</li>`;
            pokemonIdExistentes.push(await promise);
        }

    } else {
        if (pokeTime.children.length < 6) {
            pokeTime.innerHTML += `<li class="pokeTime__li w-10 h-5 relative before:block before:w-10 before:h-5 before:absolute before:-bottom-5 before:rounded-b-full before:bg-slate-300 rounded-t-full bg-red-400 text-center">${await promise}</li>`;
            pokemonIdExistentes.push(await promise);
        }
    }
};

function delPokemon() {
    for (let i = 0; i <= pokemonIdExistentes.length; i++) {
        del = true;

        let li = pokeTime.children[i];

        if (del) {
            let button = document.createElement('button');
            button.addEventListener('click', () => remvPokemon(i));
            button.className = "absolute flex justify-center items-center pb-1.5 rounded-full -top-3 w-4 h-4 bg-red-500 text-gray-200 right-0";
            button.textContent = 'x';

            li.appendChild(button);
        }
    }
};

function remvPokemon(index) {
    pokeTime.removeChild(pokeTime.children[index]);
    pokemonIdExistentes.splice(index, 1);

    for (let i = 0; i <= pokemonIdExistentes.length; i++) {
        let li = pokeTime.children[i];
        let button = li.querySelector('button');
        
        if (button) {
            li.removeChild(button);
        }
    }

    del = false;
};

function remvAllPokemon() {

    while (pokeTime.firstChild) {
        // Ele vai removendo todos os primeiros filhos (até que não tenha como ter um primeiro filho)
        pokeTime.removeChild(pokeTime.firstChild);
        pokemonIdExistentes.pop();
    }
};

function salvarTimeJSON() {
    
    if (pokemonIdExistentes.length >= 1) {
        const pokemonIdExistentesJSON = JSON.stringify(pokemonIdExistentes);
        localStorage.setItem('Ids', pokemonIdExistentesJSON);

        gerarTimesSalvos();

    } else {
        window.alert('Possua, no mínimo, um pokemon no seu time');
    }

};

async function gerarTimesSalvos() {
    const timesSalvos = localStorage.getItem('Ids');

    main.innerHTML = `
        <button onclick="retornarPokemons()" class="fixed top-5 right-5 w-28 rounded-2xl h-16 bg-slate-100 shadow-lg text-gray-900 font-semibold hover:scale-105 hover:-translate-y-1 hover:shadow-2xl active:-translate-y-0.5 active:shadow-xl active:scale-100 duration-200">Voltar</button>
        <h2 class="text-center text-slate-800 drop-shadow-2xl pt-10 mb-6 font-bold text-4xl">Seu Time Pokemon:</h2>
        <hr class="w-1/4 border-2" />
        <div id="root" class="flex h-96 justify-center"></div>
    `;

    if (timesSalvos) {
        const pokemonIds = JSON.parse(timesSalvos);
        const pokemonIdsComoNumeros = pokemonIds.map(id => parseInt(id, 10));
        const root = document.getElementById('root');

        try {
            let pokemons = await gerarPokemon(pokemonIdsComoNumeros);

            root.innerHTML = pokemons.map(pokemon => {
                console.log(pokemon.id);

                return `
                    <div class="flex flex-col justify-center">
                        <img src=${pokemon.imagem} alt=${pokemon.nome} class="h-48 w-48">
                        <h3 class="w-full text-center font-semibold text-2xl text-gray-900">${pokemon.nome}</h3>
                    </div>
                `;

            }).join('');

        } catch (error) {
            console.error('Erro ao gerar os Pokémon:', error);
        }
    }
}

async function gerarPokemon(ids) {
    try {
        const arrayPromises = ids.map(async num => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const json = await response.json();

            return {
                id: json.id,
                imagem: json.sprites['front_default'],
                nome: json.name.charAt(0).toUpperCase() + json.name.slice(1),
                type: json.types[0].type.name.charAt(0).toUpperCase() + json.types[0].type.name.slice(1),
                type2: json.types[1] ? json.types[1].type.name.charAt(0).toUpperCase() + json.types[1].type.name.slice(1) : ''
            };
        });

        const result = await Promise.all(arrayPromises.filter(pokemon => pokemon !== null));
        return result.sort((a, b) => a.id - b.id);

    } catch (error) {
        throw error;
    }
}

function retornarPokemons() {
    location.reload();
}