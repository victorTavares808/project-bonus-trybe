const { kitsu } = require('./api');
const item = require('./retorno-api-kitsu');

// Teste se kitsu é uma função 
describe('Teste da funcao kitsu', () => {
    it('Teste se kitsu é uma funcao', () => {
        expect(typeof kitsu).toBe('function')
    })
});