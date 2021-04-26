# auth

A função por padrão é assincrona, e recebe 2 parametros obrigatorios para a autenticação ser efetuada com sucesso.

### Parametros

- user: seu Nickname do Minecraft que utiliza para logar no forum;
- pass: senha do seu login no forum;

# Código de exemplo

```js

const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let login = await sc.auth({
    user: 'usuário',
    pass: 'senha',
})

```