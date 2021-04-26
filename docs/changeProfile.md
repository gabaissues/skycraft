# changeProfile

A função recebe por padrão dois parametros obrigatorios para o funcionamento da mesma.

### Parametro
- change: O valor que você quer alterar;
- value: O novo valor;

# Código de exemplo

```js
const Skycraft = require('skycraft')

await sc.changeProfile({
    change: 'valor',
    value: 'novoValor'
})
```

# Valores disponiveis

 - site
 - skype
 - devianart
 - facebook
 - twitter
 - instagram
 - discord
 - steam
 - twitch
 - localização
 - interesses
 - sexo [homem, mulher, não-binário, outro e não informado]
 - areas [todos, minigames, fullpvp, skyblock, buildteam, design, jornal, locução e mídia]

 ### Exemplo

 ```js
const Skycraft = require('skycraft')

await sc.changeProfile({
    change: 'sexo',
    value: 'homem'
})

await sc.changeProfile({
    change: 'site',
    value: 'https://gbrsrs.xyz'
})
 ```