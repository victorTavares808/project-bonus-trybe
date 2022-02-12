const div = document.querySelector('.teste')

const id = async () => {
    let arrayVazioId = [];
    for (let index = 1000; index < 1010; index += 20) {
      const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
      const chamaApi = await fetch(url);
      const response = await chamaApi.json();
      const arrayDeObjetos = response.data;
      arrayDeObjetos.find((element) => {
          console.log(element);
        arrayVazioId.push(element.attributes.posterImage.large);
      });
    }
    return arrayVazioId;
  };
  
const pegaId = async () => {
    let arrayVazioIds = [];
    for (let index = 1000; index < 1010; index += 20) {
      const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
      const chamaApi = await fetch(url);
      const response = await chamaApi.json();
      const arrayDeObjetos = response.data;
      arrayDeObjetos.find((element) => {
          /* console.log(element); */
          arrayVazioIds.push(element.id);
        });
    }
      return arrayVazioIds;
}

/* pegaId().then((data) => console.log(data)) */

  const lida = id().then((data) => {
    let contador = 0;
    data.forEach((element, index) => {
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
              for (let index = 1000; index < 1010; index += 20) {
                const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${index}`;
                const chamaApi = await fetch(url);
                const response = await chamaApi.json();
                const arrayDeObjetos = response.data;
                arrayDeObjetos.find((element) => {
                    if (capturaID === element.id) {
                        console.log(element);
                    }
                });
            }
          });
      }) 
    })
  })
  
  window.onload = async () => {
    
  };