// Helpers para posicionar navios de forma determinística nos testes.
// Tabuleiro 10x10 (linhas 0–9, colunas 0–9).
// Navios: Porta-aviões(5), Encouraçado(4), Submarino(3), Destroier(2).
// Direções: 'H' = horizontal, 'V' = vertical.

const LINHAS = 10;
const COLUNAS = 10;

// Configuração padrão de navios para testes (todos horizontais, sem sobreposição).
// Porta-aviões: linha 0, colunas 0-4
// Encouraçado:  linha 2, colunas 0-3
// Submarino:    linha 4, colunas 0-2
// Destroier:    linha 6, colunas 0-1
function naviosPadrao() {
  return [
    { tipo: 'porta-avioes', tamanho: 5, linha: 0, coluna: 0, direcao: 'H' },
    { tipo: 'encouracado',  tamanho: 4, linha: 2, coluna: 0, direcao: 'H' },
    { tipo: 'submarino',    tamanho: 3, linha: 4, coluna: 0, direcao: 'H' },
    { tipo: 'destroier',    tamanho: 2, linha: 6, coluna: 0, direcao: 'H' },
  ];
}

// Retorna todas as células que um navio ocupa.
function celulasNavio(navio) {
  const celulas = [];
  for (let i = 0; i < navio.tamanho; i++) {
    if (navio.direcao === 'H') {
      celulas.push([navio.linha, navio.coluna + i]);
    } else {
      celulas.push([navio.linha + i, navio.coluna]);
    }
  }
  return celulas;
}

// Conta quantos tiros foram dados no tabuleiro.
function contarTiros(jogo) {
  let total = 0;
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (jogo.foiAtacado(l, c)) total++;
    }
  }
  return total;
}

// Afunda todos os navios do jogador disparando em cada célula deles.
function afundarTodos(jogo, navios) {
  for (const navio of navios) {
    for (const [l, c] of celulasNavio(navio)) {
      if (!jogo.foiAtacado(l, c)) jogo.atacar(l, c);
    }
  }
}

module.exports = {
  LINHAS,
  COLUNAS,
  naviosPadrao,
  celulasNavio,
  contarTiros,
  afundarTodos,
};
