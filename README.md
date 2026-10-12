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

Funciona pelo servidor independente descrito abaixo ou pelo link do artifact no claude.ai (capacidade `room`). No Claude, quem joga precisa estar logado e ter acesso ao link.

1. Um jogador clica em **Online → Criar sala** e passa o código de 5 letras.
2. Os outros clicam em **Online**, digitam o código e entram.
3. O anfitrião escolhe mapa, bots e tempo e clica em **Começar corrida**. A largada é ao mesmo tempo para todos.

### Campeonato

Na sala, o anfitrião pode escolher o modo **Campeonato** (3 ou 5 rodadas, mapas sorteados). Cada rodada dá pontos pela colocação: 1º 10 · 2º 8 · 3º 6 · 4º 5 · 5º 4 · 6º 3 · 7º 2 · 8º 1 (quem não se classifica fica com 0). Os bots ocupam posições, mas o placar é só dos jogadores. Desempate: mais vitórias, depois a melhor colocação na última rodada.

Nas rodadas do campeonato, arquibancadas com torcida cercam o percurso: o público pula quando o jogador passa, comemora a largada e cada chegada, e faz "ola" de vez em quando.

Quem vence o campeonato desbloqueia um item secreto, em ordem: **Troféu de ouro** (chapéu), **Manto real** (roupa) e **Olhos de estrela** (rosto). Até lá eles aparecem como "🔒 Secreto" em Personalizar.

Os bots são simulados pelo anfitrião e espelhados nos outros jogadores. Um indicador mostra o estado da conexão, e o jogo tenta entrar de novo sozinho se a conexão falhar.

Aberto como arquivo local, o jogo funciona no modo solo. Fora do Claude, use o servidor independente para habilitar o online.

## Revanche, fantasma e desafios solo

Na tela de resultados, veja a diferença para o recorde e tente novamente. Em Pista Infinita, escolha repetir a mesma semente ou sortear outra pista.

As novas melhores corridas solo gravam um fantasma azul transparente, exibido na próxima tentativa do mesmo mapa e semente. Ele não colide nem ocupa posições. Recordes antigos precisam de uma nova melhor corrida para ganhar um fantasma. A gravação fica neste navegador, depende do armazenamento disponível e tem limite de cerca de 6 minutos e 40 segundos.

Os cosméticos secretos também podem ser liberados no solo:
- Troféu de ouro: termine três corridas.
- Manto real: termine uma corrida sem cair.
- Olhos de estrela: termine os seis mapas clássicos.

O progresso aparece nos resultados e fica salvo neste navegador. As recompensas por campeonato online continuam disponíveis.

Validação: `node procedural.test.cjs` e `node progression.test.cjs`.

## Som, câmera, pausa e qualidade

Abra **Opções** para ajustar o volume, silenciar todos os sons, mudar a sensibilidade da câmera, escolher qualidade Leve/Média/Alta e ativar tremor de câmera. As preferências ficam salvas. Leve reduz a resolução, desliga sombras e reduz partículas.

No solo, **Esc** ou **Pausar** congelam a corrida e abrem as opções. Trocar de aba ou tirar o foco também pausa o solo. A corrida online segue em tempo real.

Mergulhos, impactos e aterrissagens fortes agora geram partículas; chegar à linha final solta uma celebração colorida. Sons de impacto variam a cada colisão. O tremor é opcional e começa desligado.

## Online independente do Claude

Com Node.js instalado, execute `node server.cjs` nesta pasta e abra [o jogo local](http://localhost:8080). O servidor entrega o jogo e sincroniza salas de até 20 participantes. Não precisa instalar pacotes. Dois navegadores ou dispositivos que acessem o mesmo servidor podem criar/entrar em uma sala pelo código existente. Na rede local, use o endereço IP do computador e a porta 8080, se o firewall permitir.

Para acesso pela internet, hospede `server.cjs` junto de `tombo-total.html` em um serviço com Node.js e HTTPS. A porta pode ser definida pela variável `PORT`. O servidor mantém as salas em memória: reiniciar encerra as salas e todos os participantes precisam acessar a mesma instância. Participantes sem contato por 30 segundos expiram. Esta primeira versão usa sincronização HTTP a cada 100 ms e mantém o modelo de confiança nos clientes do jogo; não inclui contas, ranking público ou proteção competitiva contra trapaça.

Validação adicional: `node online.test.cjs`.
