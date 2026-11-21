// Testes de posicionamento de navios
// Eduardo Barella — RA 24088000-2

const BatalhaNaval = require('../src/BatalhaNaval');
const { naviosPadrao, celulasNavio } = require('./helpers/tabuleiros');

describe('Posicionamento de navios', () => {
  test('CT01 — deve aceitar os 4 navios obrigatórios na configuração padrão', () => {
    expect(() => new BatalhaNaval({ navios: naviosPadrao() })).not.toThrow();
  });

  test('CT02 — deve lançar erro se faltar algum navio obrigatório', () => {
    const semPortaAvioes = naviosPadrao().filter(n => n.tipo !== 'porta-avioes');
    expect(() => new BatalhaNaval({ navios: semPortaAvioes })).toThrow();
  });

  test('CT03 — deve lançar erro se navio estiver fora do tabuleiro', () => {
    const navios = naviosPadrao();
    navios[0] = { tipo: 'porta-avioes', tamanho: 5, linha: 0, coluna: 7, direcao: 'H' }; // col 7-11, fora
    expect(() => new BatalhaNaval({ navios })).toThrow();
  });

  test('CT04 — deve lançar erro se dois navios se sobrepõem', () => {
    const navios = naviosPadrao();
    navios[1] = { tipo: 'encouracado', tamanho: 4, linha: 0, coluna: 0, direcao: 'H' }; // sobrepõe porta-aviões
    expect(() => new BatalhaNaval({ navios })).toThrow();
  });

  test('CT05 — navio vertical deve ser aceito', () => {
    const navios = naviosPadrao();
    navios[0] = { tipo: 'porta-avioes', tamanho: 5, linha: 0, coluna: 9, direcao: 'V' };
    expect(() => new BatalhaNaval({ navios })).not.toThrow();
  });

  test('CT06 — estado inicial deve ser "jogando" e nenhuma célula atacada', () => {
    const jogo = new BatalhaNaval({ navios: naviosPadrao() });
    expect(jogo.obterEstado()).toBe('jogando');
    for (let l = 0; l < 10; l++) {
      for (let c = 0; c < 10; c++) {
        expect(jogo.foiAtacado(l, c)).toBe(false);
      }
    }
  });
});
