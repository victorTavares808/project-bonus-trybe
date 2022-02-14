const ordernar = () => {
    const x = document.querySelector('.animes1');
    [...x.children]
    .sort((a,b)=> parseFloat(b.alt) - parseFloat(a.alt))
    .forEach( elemento => document.querySelector('.animes1').appendChild(elemento))
    }

module.exports = {
    ordenar
};