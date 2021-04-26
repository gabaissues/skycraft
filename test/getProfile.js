const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let login = await sc.auth({
    user: 'usuário',
    pass: 'senha',
})

/* A função de autenticação é obrigatória nesse questio, portanto, está nesse código também. */

let profile = await sc.getProfile({ user: 'usuário' })
console.log(profile)