// Testes de fim de jogo da batalha naval
// Eduardo Barella — RA 24088000-2

const BatalhaNaval = require('../src/BatalhaNaval');
const { naviosPadrao, celulasNavio, afundarTodos } = require('./helpers/tabuleiros');

function jogoNovo() {
  return new BatalhaNaval({ navios: naviosPadrao() });
}

describe('Fim de jogo', () => {
  test('CT14 — afundar todos os navios encerra com vitória', () => {
    const jogo = jogoNovo();
    const navios = naviosPadrao();
    afundarTodos(jogo, navios);
    expect(jogo.obterEstado()).toBe('vitoria');
  });

  test('CT15 — enquanto restar um navio intacto a partida continua', () => {
    const jogo = jogoNovo();
    const navios = naviosPadrao();
    // Afunda tudo exceto o destroier
    const semDestroier = navios.filter(n => n.tipo !== 'destroier');
    afundarTodos(jogo, semDestroier);
    expect(jogo.obterEstado()).toBe('jogando');
  });

  test('CT16 — após vitória não é possível atacar', () => {
    const jogo = jogoNovo();
    afundarTodos(jogo, naviosPadrao());
    expect(jogo.obterEstado()).toBe('vitoria');
    expect(() => jogo.atacar(9, 9)).toThrow();
  });

  test('CT17 — navios afundados devem ser listados corretamente', () => {
    const jogo = jogoNovo();
    // Afunda só o destroier (linha 6, colunas 0-1)
    jogo.atacar(6, 0);
    jogo.atacar(6, 1);
    expect(jogo.estaAfundado('destroier')).toBe(true);
    expect(jogo.estaAfundado('submarino')).toBe(false);
    expect(jogo.estaAfundado('encouracado')).toBe(false);
    expect(jogo.estaAfundado('porta-avioes')).toBe(false);
  });

  test('CT18 — visão do tabuleiro deve refletir acertos, erros e afundamentos', () => {
    const jogo = jogoNovo();
    jogo.atacar(0, 0); // acerto (porta-aviões)
    jogo.atacar(9, 9); // água
    const visao = jogo.tabuleiroVisivel();
    expect(visao[0][0]).toBe('X'); // acerto
    expect(visao[9][9]).toBe('O'); // água
    expect(visao[0][1]).toBe('?'); // não atacado
  });
});
