const linkYouTube = 'https://www.youtube.com/embed/'

// Recuperando tags do HTML com NodeList
const divBanners = document.querySelector('.animes');
const bannerPrincipal = document.querySelector('.banners');
const tituloDoAnime = document.querySelector('#titulo-do-anime');
const descricaoDoAnime = document.querySelector('#descricao');
const notaDoAnime = document.querySelector('#nota');
const tituloVideo = document.querySelector('.titulo-video')

// kitsu() => Acessa arquivo json da Api Kitsu
const kitsu = async () => {
    const url = 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=20';
    const chamaApi = await fetch(url);
    const response = await chamaApi.json();
    return response; 
}

// capturaVideo() => Essa função pega um id, junta com a url do You tube para encontrar o vídeo referente ao id e cria uma tag para colocar o vídeo;
const capturaVideo = (id) => {
    const tagVideo = document.querySelector('.video')
    tagVideo.src = linkYouTube + id;
}

// manipulacaoBanners => Monta imagem com src, class e id
const manipulacaoBanners = (image, identificacao) => {
    const imagem = document.createElement('img');
    imagem.src = image;
    imagem.id = identificacao
    imagem.classList.add('imageAnimes')
    divBanners.appendChild(imagem);
}

// manipulacaoTexto() Monta texto ou numeração para titulo, descricao, titulo do vídeo e nota =>
const manipulacaoTexto = (titulo, descricao, nota) => {
    tituloDoAnime.innerText = titulo;
    descricaoDoAnime.innerText = descricao;
    notaDoAnime.innerText = `Nota: ${nota}`;
    tituloVideo.innerText = titulo;
}

// Linha 21 a 29 => É feito um forEach em cima do data.data que seria o array de objetos para criar imagem com url e id;
kitsu().then((data) => {
    data.data.forEach((element) => {
        if (!element.attributes
                .canonicalTitle
                    .includes('Ghost in the Shell')) {
            manipulacaoBanners(element.attributes.posterImage.large, element.id)
        };
    });
    // Linha 40 a 53 estou recuperando todas as imagens e jogando um evento de click nelas e dentro do evento de click eu estou comparando se o id do objeto é o mesmo id que foi pego pelo target com um find, se for ele é pego por uma constante, e apos isso eu uso a função manipulacaoTexto para colocar cada informação no seu devido lugar. 
    const imagemDeAnimes = document.querySelectorAll('.imageAnimes')
    imagemDeAnimes.forEach((element) => element.addEventListener('click', (event) => {
        const clickId = event.target.id;
        const objetoAnime = data.data.find((element) => element.id === clickId);
        console.log(objetoAnime.attributes.youtubeVideoId)
        manipulacaoTexto(objetoAnime
            .attributes.canonicalTitle, objetoAnime
            .attributes.description, objetoAnime
            .attributes.averageRating);
        capturaVideo(objetoAnime.attributes.youtubeVideoId)
        bannerPrincipal.style.backgroundImage = `url('${objetoAnime.attributes.posterImage.large}'`;
        bannerPrincipal.style.backgroundRepeat = 'no-repeat'
    }))
});