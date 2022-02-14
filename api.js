const kitsu = async (pagina) => {
    const url = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${pagina}`;
    const chamaApi = await fetch(url);
    const response = await chamaApi.json();
    return response; 
}

if (typeof module !== 'undefined') {
    module.exports = {
      kitsu,
    };
  }