function gerarNum(min, max) {
    const arrayPokemonsNum = [];

    for(let i = min; i <= max; i++) {
        arrayPokemonsNum.push(i);
    };

    return arrayPokemonsNum;
};

function gerarPokemon() {
    const array = [];
    return gerarNum(1, 151).map(num => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(data => data.json())
        .then(json => {
            let obj = {
                nome: json.name,
                id: json.id
            }
            array.push(obj);
            array.sort((a, b) => a.id - b.id);
        })
    });
}
gerarPokemon()

// fetch(`https://pokeapi.co/api/v2/pokemon/1`)
//         .then(data => data.json())
//         .then(json => console.log(json.name))

