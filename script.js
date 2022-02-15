/* 

URL para trazer informações de animes
    vários animes: https://api.aniapi.com/v1/anime

    referente ao id especificado https://api.aniapi.com/v1/anime/v1/anime/:id

    OBS: A url abaixo deve receber title, anilist_id, mal_id, formats, status, year, season genres

    Outra forma de acessar: https://api.aniapi.com/v1/anime?title=One%20Piece&formats=0,1&status=1&year=1999&season=3&genres=Pirates,War,Cyborg&nsfw=true

    Mais outra forma: https://api.aniapi.com/v1/random/anime/:count/:nsfw

URL para trazer episódio dos animes:
    Observação: O primeiro número da url é o id do anime e o segundo é episódio especifico (o segundo valor não é obrigatório, se não tiver o segundo ele trará todos os episódeos)

    https://api.aniapi.com/v1/episode?anime_id=11&number=11&is_dub=true&locale=it

URL para trazer musicas dos animes:

    para busca música especifica: https://api.aniapi.com/v1/song/:id

    para buscar várias musicas https://api.aniapi.com/v1/song

URL para trazer musicas dos animes:

    Observação: na url tem que ser passado o anime_id, title, artist, year, season e type

    para buscar músicas: https://api.aniapi.com/v1/song?anime_id=10&title=Naruto&artist=FLOW&year=2010&season=5&type=nada

    Outra forma de buscar: https://api.aniapi.com/v1/random/song/5

URL para retornar uma lista aleatória de animes 

    https://api.aniapi.com/v1/random/anime/5/true


*/

// Recuperando tags do HTML com NodeList
const divBanners = document.querySelector('.animes');
const divBanners1 = document.querySelector('.animes1');
const bannerPrincipal = document.querySelector('.banners');
const tituloDoAnime = document.querySelector('#titulo-do-anime');
const descricaoDoAnime = document.querySelector('#descricao');
const notaDoAnime = document.querySelector('#nota');
const tituloVideo = document.querySelector('.titulo-video');
const proximaLista = document.querySelector('.proximo');
const proximaLista2 = document.querySelector('.btn2');
const main = document.getElementById('main');
const caixaDeBusca = document.querySelector('.caixa-de-busca');
const botaoDePesquisa = document.querySelector('.pesquisar');
const divAnimes = document.querySelector('.episodios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDgiLCJuYmYiOjE2NDQ2Nzc4NzIsImV4cCI6MTY0NzI2OTg3MiwiaWF0IjoxNjQ0Njc3ODcyfQ.wNFd0OuwHmQtIFtyW915VngV5rsB5ljjwTUSNg4CBUY';

const aniApiAnimes = async () => {
    const responseInfo = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'no-cors'
        },
      }
    /* const url = 'https://api.aniapi.com/v1/anime'; */
    const url = 'https://api.aniapi.com/v1/anime'
    const api = await fetch(url, responseInfo);
    const response = await api.json();
    return response;
};

aniApiAnimes().then((data) => data);

const aniApiPesquisa = async (pesquisa) => {
    const responseInfo = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'no-cors'
        },
      }
    /* const url = 'https://api.aniapi.com/v1/anime'; */
    const url = `https://api.aniapi.com/v1/anime?title=${pesquisa}%20&nsfw=true`
    const api = await fetch(url, responseInfo);
    const response = await api.json();
    return response;
};

const aniApiEpisode = async (id = 11) => {
    const responseInfo = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'no-cors'
        },
      }
    /* const url = 'https://api.aniapi.com/v1/anime'; */
    const url = `https://api.aniapi.com/v1/episode?anime_id=${id}&number=&is_dub=true&locale=it`
    const api = await fetch(url, responseInfo);
    const response = await api.json();
    return response;
};

const colocaEpisodios = (img) => {
    const caminho = document.createElement('source')
    caminho.src = img
    caminho.type = 'video/mp4'
    divAnimes.appendChild(caminho)
}

aniApiEpisode().then((data) => {
   console.log(data.data.current_page = 2)
   console.log(data.data)
});

botaoDePesquisa.addEventListener('click', () => {
    aniApiPesquisa(caixaDeBusca.value.split(' ').join('%20'))
        .then((data) => data.data.documents);
});

/* aniApiPesquisa().then((data) => console.log(data.data.documents)) */

const manipulacaoBanners = (image, identificacao, rating, local1) => {
    const imagem = document.createElement('img');
    imagem.src = image;
    imagem.id = identificacao;
    imagem.alt = rating;
    imagem.classList.add('imageAnimes');
    local1.appendChild(imagem);
}

const manipulacaoBanners1 = (image, identificacao, rating, local1) => {
    const imagem = document.createElement('img');
    imagem.src = image;
    imagem.id = identificacao;
    imagem.alt = rating;
    imagem.classList.add('imageAnimes');
    local1.appendChild(imagem);
}

const manipulacaoTexto = (titulo, descricao, nota) => {
    tituloDoAnime.innerText = titulo;
    descricaoDoAnime.innerText = descricao;
    notaDoAnime.innerText = `Nota: ${nota}`;
    tituloVideo.innerText = titulo;
}

const manipulaInformacoes = (animes, dado) => {
    animes.forEach((element) => element.addEventListener('click', (event) => {
        const clickId = event.target.id;
        const objetoAnime = dado.data.documents.find((element) => element.id === parseInt(clickId));
        manipulacaoTexto(objetoAnime.titles.en, objetoAnime.descriptions.en, objetoAnime.score);
        capturaVideo(objetoAnime['trailer_url']);
        bannerPrincipal.style.backgroundImage = `url('${objetoAnime.banner_image}')`;
        main.style.display = 'block';
    }));
}

const capturaVideo = (url) => {
    const tagVideo = document.querySelector('.video');
    if (url !== undefined) {
        tagVideo.src = url;
    } else {
        tagVideo.src = '';
    }
}

aniApiAnimes().then((data) => {
    data.data.documents.forEach((element) => {
        manipulacaoBanners(element['cover_image'], element.id, element.score, divBanners);
        manipulacaoBanners1(element['cover_image'], element.id, element.score, divBanners1)
    });
    const imagensDeAnimes = document.querySelectorAll('.imageAnimes');
    manipulaInformacoes(imagensDeAnimes, data);
});



