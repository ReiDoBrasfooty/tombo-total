# Tombo Total

Corrida de obstáculos 3D no estilo Fall Guys, feita com Three.js num único arquivo HTML.

Você é o Hélio, um feijão gelatinoso, correndo contra bots e, no modo online, contra amigos. Só 2/3 dos corredores se classificam, e cada mapa tem um tempo limite.

## Como jogar

Abra `tombo-total.html` no navegador (precisa de internet para carregar o Three.js e as fontes).

| Tecla | Ação |
| --- | --- |
| WASD / setas | Correr |
| Espaço | Pular |
| Shift | Mergulhar para a frente |
| Arrastar o mouse | Girar a câmera |
| Roda do mouse | Zoom |

No celular aparecem um joystick e botões de pular e mergulhar.

## Mapas

Cada percurso fica sobre uma piscina de gosma no meio de um estádio, cercado por um cenário temático (árvores e pirulitos, torres, nuvens, chaminés, pinheiros e bonecos de neve, rochas de lava…), colinas, montanhas no horizonte e céu em degradê.

| Mapa | Dificuldade | Limite | Obstáculos |
| --- | --- | --- | --- |
| Parque Gelatina | Clássico | 3:00 | Varredor giratório, plataformas dançantes, ponte dos pêndulos, discos, avalanche de bolas e piso que cai |
| Torre das Portas | Normal | 2:30 | Portas falsas, escadaria, três moinhos no alto e piso que cai |
| Céu de Algodão | Normal | 2:30 | Trampolins, plataformas turbo, cinco pêndulos e discos turbo |
| Fábrica Furiosa | Difícil | 2:30 | Esteiras que empurram para trás, socadores e plataformas que somem |
| Pico Gelado | Difícil | 2:45 | Escadaria estreita com pêndulos, supertrampolins, ponte fininha e discos turbo |
| Caos Total | Insano | 2:45 | Só uma porta quebra, esteira com pêndulos, chuva de bolas dobrada e varredor turbo |

## Partida

No menu, em "Partida": número de bots (0 a 19) e tempo limite (do mapa, de 1 a 5 minutos, ou sem limite).

## Personalização

No menu, em "Personalizar": nome, cor, chapéu (hélice, coroa, cartola, laço ou nenhum), roupa (camiseta, macacão, capa de herói, gravata, cachecol, tutu ou boia), rosto (normal, feliz, óculos escuros, ciclope, sonolento, bigode ou dentuço) e cor do tênis. No modo online, os outros jogadores veem a sua aparência. Escolhas, mapa, partida e recordes ficam salvos no navegador.

## Modo online

Funciona quando o jogo é aberto pelo link do artifact no claude.ai (usa a capacidade `room`). Quem joga precisa estar logado e ter acesso ao link.

1. Um jogador clica em **Online → Criar sala** e passa o código de 5 letras.
2. Os outros clicam em **Online**, digitam o código e entram.
3. O anfitrião escolhe mapa, bots e tempo e clica em **Começar corrida**. A largada é ao mesmo tempo para todos.

### Campeonato

Na sala, o anfitrião pode escolher o modo **Campeonato** (3 ou 5 rodadas, mapas sorteados). Cada rodada dá pontos pela colocação: 1º 10 · 2º 8 · 3º 6 · 4º 5 · 5º 4 · 6º 3 · 7º 2 · 8º 1 (quem não se classifica fica com 0). Os bots ocupam posições, mas o placar é só dos jogadores. Desempate: mais vitórias, depois a melhor colocação na última rodada.

Nas rodadas do campeonato, arquibancadas com torcida cercam o percurso: o público pula quando o jogador passa, comemora a largada e cada chegada, e faz "ola" de vez em quando.

Quem vence o campeonato desbloqueia um item secreto, em ordem: **Troféu de ouro** (chapéu), **Manto real** (roupa) e **Olhos de estrela** (rosto). Até lá eles aparecem como "🔒 Secreto" em Personalizar.

Os bots são simulados pelo anfitrião e espelhados nos outros jogadores. Um indicador mostra o estado da conexão, e o jogo tenta entrar de novo sozinho se a conexão falhar.

Aberto como arquivo local ou fora do claude.ai, o jogo funciona normalmente no modo solo.
