# getProfile

A função por padrão é assincrona, e recebe 1 parametro obrigatorio e um opcional.

### Parametros
- user: Usuário que deseja receber informações;
- maxTimeout: Tempo máximo de resposta;

# Código de exemplo

```js
const Skycraft = require('skycraft')

let profile = await sc.getProfile({ user: 'usuário' })
```