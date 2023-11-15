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

            if (json.types.length === 1) {
                return {
                    nome: json.name,
                    id: json.id,
                    type: json.types[0].type.name
                };

            } else if (json.types.length === 2) {
                return {
                    nome: json.name,
                    id: json.id,
                    type: json.types[0].type.name,
                    type2: json.types[1].type.name
                };
                
            } else {
                return null;
            }
        });

        const result = await Promise.all(arrayPromises.filter(pokemon => pokemon !== null));
        return result.sort((a, b) => a.id - b.id);

    } catch (error) {
        throw error;
    }
}
