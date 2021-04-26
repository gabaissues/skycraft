const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let login = await sc.auth({
    user: 'usuário',
    pass: 'senha',
})

/* 

    Por padrão, a função AUTH ela é assincrona, mas não retorna nenhum dado de relevância, somente os dados inseridos para comprovar que foi autenticado com sucesso. 
    Você pode usar sem declarar uma váriavel. 

*/