
const div = document.querySelector('.grow');
const opcoes = document.querySelectorAll('.opcoes')



// Constroi array com links de imagens
const id = async () => {
    let arrayVazioId = [];
    for (let index = 1; index < 80; index += 20) {
      const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
      const chamaApi = await fetch(url);
      const response = await chamaApi.json();
      const arrayDeObjetos = response.data;
      arrayDeObjetos.find((element) => {
        if(!element.attributes.description.includes('sex') &&
        !element.attributes.canonicalTitle.includes('Ghost in the Shell') &&
        !element.attributes.description.includes('hentai') &&
        !element.attributes.description.includes('girls') &&
        !element.attributes.canonicalTitle.includes('Rozen Maiden') &&
        !element.attributes.canonicalTitle.includes('DearS')) {
            console.log(element)
            arrayVazioId.push(element.attributes.posterImage.large);
        }
      });
    }
    /* console.log(arrayVazioId) */
    return arrayVazioId;
  };

// Constroi array de Ids
const pegaId = async () => {
    let arrayVazioIds = [];
    for (let index = 1; index < 80; index += 20) {
      const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
      const chamaApi = await fetch(url);
      const response = await chamaApi.json();
      const arrayDeObjetos = response.data;
      arrayDeObjetos.find((element) => {
        if(!element.attributes.description.includes('sex') &&
        !element.attributes.canonicalTitle.includes('Ghost in the Shell') &&
        !element.attributes.description.includes('hentai') &&
        !element.attributes.description.includes('girls') &&
        !element.attributes.canonicalTitle.includes('Rozen Maiden') &&
        !element.attributes.canonicalTitle.includes('DearS')) {
            arrayVazioIds.push(element.id);
        }
        });
    }
      return arrayVazioIds;
}
    // Cria elementos e adiciona todos como filho da tag div
    const manipulacao = (im) => {
        const principal = document.querySelector('.main');
        const para = document.querySelector('.lorem');
        const para2 = document.querySelector('.synopsis')
        const div = document.querySelector('.grow');
        const h1 = document.querySelector('.nome-anime');
        const nota = document.querySelector('.nota');
        const lorem = document.querySelector('.lorem');
        const imagem = document.createElement('img');
        
        imagem.src = im.attributes.posterImage.large
        h1.innerText = im.attributes.canonicalTitle;
        para.innerText = im.attributes.synopsis;
        
        div.appendChild(imagem);
        principal.style.backgroundImage = `url(${im.attributes.posterImage.large})`
        /* div.appendChild(img); */
    }

  
  // 
  const lida = id().then((data) => {
    let contador = 0;
    data.forEach((element) => {
        const img = document.createElement('img');
        img.src = element;
        img.classList.add('banners-animes');
        div.appendChild(img);
    });
    pegaId().then((data) => {
      const teste = document.querySelectorAll('.banners-animes');
      data.forEach((element) => {
        teste[contador].id = element;
        contador += 1
      })
      teste.forEach((element) => {
          element.addEventListener('click', async () => {
              const capturaID = element.id;
              console.log(capturaID)
              for (let index = 1; index < 80; index += 20) {
                const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
                const chamaApi = await fetch(url);
                const response = await chamaApi.json();
                const arrayDeObjetos = response.data;
                arrayDeObjetos.find((element) => {
                    if (capturaID === element.id) {
                        console.log(element);
                        manipulacao(element);
                    }
                });
            }
          });
      });
    })
  })

  opcoes.forEach((element) => {
    element.addEventListener('click', (event) => {
      if(event.target === opcoes[0]) { // Categorias
        console.log('Você clicou na primeira opção :D');
      }
      if (event.target === opcoes[1]) { // Top Ratings
        console.log('Você clicou na segunda opção :D');
      }
      if (event.target === opcoes[2]) { // Lista
        console.log('Você clicou na terceira opção')
      }
      if (event.target === opcoes[3]) { // Descubra
        console.log('Você clicou na quarta opção')
      }
    })
  });
  
  window.onload = async () => {

  };