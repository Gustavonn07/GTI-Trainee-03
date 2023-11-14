function gerarNum(min, max) {
    const arrayPokemonsNum = [];

    for (let i = min; i <= max; i++) {
        arrayPokemonsNum.push(i);
    }

    return arrayPokemonsNum;
}

async function gerarPokemon() {
    try {
        const arrayPromises = gerarNum(1, 151).map(async num => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const json = await response.json();

            return {
                nome: json.name,
                id: json.id
            };
        });

        const result = await Promise.all(arrayPromises);
        return result.sort((a, b) => a.id - b.id);

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

gerarPokemon()
    .then(result => console.log(result))
    .catch(error => console.error(error));
