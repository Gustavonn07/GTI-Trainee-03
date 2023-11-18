export default function addPokemon() {

    const buttons = document.querySelectorAll('[data-pokemon-id]');

        if (buttons.length === 0) {
            console.warn('Nenhum botão encontrado com o atributo data-pokemon-id.');
        }

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
            const pokemonId = event.target.dataset.pokemonId;
            console.log(`Botão "Adicionar" clicado para o Pokémon com ID: ${pokemonId}`);
        });
    });
}