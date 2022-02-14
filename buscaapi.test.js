const { ordenar } = require('./buscaapi');

describe('Quando chamada, a função kitsu', () => {
    it('espera que a função fetch tenha sido chamada', async () => {
        const api =  ordenar();
      expect(api).toHaveReturned();
    });
  });
