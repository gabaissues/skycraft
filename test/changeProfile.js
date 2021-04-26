const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let login = await sc.auth({
    user: 'usuário',
    pass: 'senha',
})

/* A função de autenticação é obrigatória nesse questio, portanto, está nesse código também. */

await sc.changeProfile({
    change: 'valor',
    value: 'novoValor'
})

/* Valores para serem alterados disponiveis */

/**
 * site
 * skype
 * devianart
 * facebook
 * twitter
 * instagram
 * discord
 * steam
 * twitch
 * localização
 * interesses
 * sexo [homem, mulher, não-binário, outro e não informado]
 * areas [todos, minigames, fullpvp, skyblock, buildteam, design, jornal, locução e mídia]
 */

/* Exemplo */

await sc.changeProfile({
    change: 'sexo',
    value: 'homem'
})

await sc.changeProfile({
    change: 'site',
    value: 'https://gbrsrs.xyz'
})