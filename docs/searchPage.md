# searchPage

A função por padrão é assincrona, e recebe três parametros essenciais para o funcionamento e um opcional.

### Parameros

- minigame: Recebe o minigame que deseja buscar;
- page: Página que deseja buscar;
- temporada: geral/mensal

- maxTimeout (opcional): Máximo de tempo de resposta, por padrão, é 200ms.

# Código de exemplo

```js

const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let page = await sc.searchPage({
    minigame: 'bedwars',
    page: 1,
    temporada: 'mensal'
})

```