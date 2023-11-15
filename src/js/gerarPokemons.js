function gerarNum(min, max) {
    const arrayPokemonsNum = [];

    for (let i = min; i <= max; i++) {
        arrayPokemonsNum.push(i);
    }

    return arrayPokemonsNum;
}

export default async function gerarPokemon() {
    try {
        const arrayPromises = gerarNum(1, 151).map(async num => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const json = await response.json();

            return {
                    id: json.id,
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
