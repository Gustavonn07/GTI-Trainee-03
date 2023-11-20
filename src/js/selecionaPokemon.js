const pokeTime = document.getElementById('pokeTime__ul');
let repetidoPode = false;

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

    const pokemonIdExistentes = Array.from(pokeTime.children).map(li => li.innerText.trim());

    if (!repetidoPode) {
        if (pokeTime.children.length < 6 && !pokemonIdExistentes.includes(await promise)) {
            pokeTime.innerHTML += `<li>${await promise}</li>`;
        }

    } else {
        if (pokeTime.children.length < 6) {
            pokeTime.innerHTML += `<li>${await promise}</li>`;
        }
    }
}

