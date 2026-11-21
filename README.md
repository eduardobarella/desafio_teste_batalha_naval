# desafio_teste_batalha_naval

Casos de teste em JavaScript (Jest) para **Batalha Naval** em tabuleiro **10×10**.

O jogo em si **não está implementado** — os testes falham de propósito (TDD fase RED).

---

## Desafio

Batalha Naval em tabuleiro 10×10 com os seguintes navios:
- 1 Porta-aviões (ocupa 5 casas)
- 1 Encouraçado (ocupa 4 casas)
- 1 Submarino (ocupa 3 casas)
- 1 Destroier (ocupa 2 casas)

---

## Colaboradores

| Nome | RA | GitHub |
|---|---|---|
| Eduardo Barella | 24088000-2 | [@eduardobarella](https://github.com/eduardobarella) |

---

## Como rodar

Requer **Node.js 18+**.

```bash
npm install
npm test
```

Todos os testes falham até que `src/BatalhaNaval.js` seja implementado — isso é esperado.

---

## Funcionamento dos casos de teste

Os testes testam a **lógica da classe** `BatalhaNaval` (exportada em `src/BatalhaNaval.js`).

### Interface esperada da classe

```js
const jogo = new BatalhaNaval({ navios: [...] });

// Navio: { tipo, tamanho, linha, coluna, direcao: 'H'|'V' }
// Tipos: 'porta-avioes'(5), 'encouracado'(4), 'submarino'(3), 'destroier'(2)

jogo.obterEstado()          // 'jogando' | 'vitoria'
jogo.atacar(linha, coluna)  // 'acerto' | 'agua' | 'afundou'
jogo.foiAtacado(linha, col) // boolean
jogo.estaAfundado(tipo)     // boolean
jogo.tabuleiroVisivel()     // matriz 10×10: '?' não atacado | 'X' acerto | 'O' água
```

### Símbolos do `tabuleiroVisivel()`

| Símbolo | Significado |
|---|---|
| `?` | Célula não atacada |
| `X` | Acerto (navio atingido) |
| `O` | Água (tiro na água) |

### Casos de teste

| Arquivo | IDs | Comportamento testado |
|---|---|---|
| `tests/navios.test.js` | CT01–CT06 | Posicionamento, sobreposição, fora do tabuleiro |
| `tests/ataques.test.js` | CT07–CT13 | Acerto, água, célula repetida, afundamento |
| `tests/fimDeJogo.test.js` | CT14–CT18 | Vitória, bloqueio, visão do tabuleiro |

Total: **18 casos de teste**.
