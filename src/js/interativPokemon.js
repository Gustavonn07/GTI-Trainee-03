const pokeTime = document.getElementById('pokeTime__ul');
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
}

async function delPokemon() {
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
}

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
}

function remvAllPokemon() {

    while (pokeTime.firstChild) {
        // Ele vai removendo todos os primeiros filhos (até que não tenha como ter um primeiro filho)
        pokeTime.removeChild(pokeTime.firstChild);
    }

    del = false;
}