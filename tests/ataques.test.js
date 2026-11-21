// Testes de ataques ao tabuleiro
// Eduardo Barella — RA 24088000-2

const BatalhaNaval = require('../src/BatalhaNaval');
const { naviosPadrao, celulasNavio, contarTiros } = require('./helpers/tabuleiros');

function jogoNovo() {
  return new BatalhaNaval({ navios: naviosPadrao() });
}

describe('Ataques', () => {
  test('CT07 — atacar célula com navio retorna "acerto"', () => {
    const jogo = jogoNovo();
    expect(jogo.atacar(0, 0)).toBe('acerto'); // porta-aviões em (0,0)
  });

  test('CT08 — atacar célula vazia retorna "agua"', () => {
    const jogo = jogoNovo();
    expect(jogo.atacar(9, 9)).toBe('agua');
  });

  test('CT09 — célula atacada deve ser marcada', () => {
    const jogo = jogoNovo();
    jogo.atacar(0, 0);
    expect(jogo.foiAtacado(0, 0)).toBe(true);
    expect(jogo.foiAtacado(0, 1)).toBe(false);
  });

  test('CT10 — atacar a mesma célula duas vezes deve lançar erro', () => {
    const jogo = jogoNovo();
    jogo.atacar(0, 0);
    expect(() => jogo.atacar(0, 0)).toThrow();
  });

  test('CT11 — coordenadas inválidas devem lançar erro', () => {
    const jogo = jogoNovo();
    expect(() => jogo.atacar(-1, 0)).toThrow();
    expect(() => jogo.atacar(0, 10)).toThrow();
    expect(() => jogo.atacar(10, 10)).toThrow();
  });

  test('CT12 — afundar todas as células de um navio retorna "afundou"', () => {
    const jogo = jogoNovo();
    // Porta-aviões: (0,0) a (0,4)
    jogo.atacar(0, 0); jogo.atacar(0, 1); jogo.atacar(0, 2); jogo.atacar(0, 3);
    const resultado = jogo.atacar(0, 4);
    expect(resultado).toBe('afundou');
  });

  test('CT13 — navio não afundado enquanto restar célula intacta', () => {
    const jogo = jogoNovo();
    jogo.atacar(0, 0); jogo.atacar(0, 1); jogo.atacar(0, 2); jogo.atacar(0, 3);
    expect(jogo.atacar(9, 9)).toBe('agua'); // outro ataque antes de afundar
    expect(jogo.estaAfundado('porta-avioes')).toBe(false);
  });
});
