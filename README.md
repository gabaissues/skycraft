# Skycraft Package

⚠️ Está package não é oficial, é apenas algo feito experimentalmente por mim. Se a SkyCraft quiser uma package com o mesmo nome para o Node, eu terei que remover esta.

# Instalação

```shell

npm i skycraft --save 

Ou

yarn add skycraft

```

# Como utilizar

Para você utilizar é super simples, no meu repositorio do github tem um código que você pode copiar e colar e testar que vai funcionar perfeitamente.

### Start 

```js

const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: aflse })

```

A função start recebe somente o parametro show, que tem o intuito de mostrar o que passa por trás da função. Ela abre um navegador em sua máquina para obter os dados diretamente do site do skycraft. Se você mudar o parametro show para true, você pode visualizar exatamente o que o browser está executando por trás.

### SearchPage 

```js

const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let page = await sc.searchPage({
    minigame: 'bedwars',
    page: 1,
    temporada: 'mensal'
})

```

A função searchPage recebe os parametros, response, minigame, page, e temporada. Ela tem o intuito de buscar os dados da página escolhida diretamente do ranking do skycraft, de forma ao vivo. 

- response (Dado que retorna da função start)
- minigame (Minigame do próprio site do skycraft)
- page (Página no qual você quer buscar os dados)
- temporada (Temporada no qual você quer buscar, seja mensal ou geral)

# Minigames disponiveis

 - tntrun
 - skywars
 - oneinthechamber
 - buildmasters
 - teamskywars
 - capturetheflag
 - escondeesconde
 - duoskywars
 - duobuildmasters
 - teamdeathmatch
 - paintball
 - eggwars
 - murder
 - defenders
 - duoeggwars
 - soloeggwars
 - bedwars
 - solobedwars
 - duobedwars
 - blockparty

# Finalização

Bom, a package ainda está no seu inicio. Qualquer erro me reportem, se ocorrer algum erro, sugestão, ou dúvida, fiquem a vontade de me reportar através do meu discord ou email.

- 🎮 Discord: gb.#0001
- ✉️ Email: ogabrielskj@gmail.com