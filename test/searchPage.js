const Skycraft = require('skycraft')

let sc = new Skycraft.Client({ show: false })

let page = await sc.searchPage({
    minigame: 'bedwars',
    page: 1,
    temporada: 'mensal'
})

/* 

    O parametro minigame, recebe o minigame que você deseja buscar.
    O parametro page, recebe a numeração da página que você deseja buscar.
    O parametro temporada, recebe geral/mensal.
    O parametro maxTimeout, é opcional, recebe o valor de tempo de resposta em MS.

*/

/**
 * Minigames disponiveis:
 * 
 * tntrun
 * skywars
 * oneinthechamber
 * buildmasters
 * teamskywars
 * capturetheflag
 * escondeesconde
 * duoskywars
 * duobuildmasters
 * teamdeathmatch
 * paintball
 * eggwars
 * murder
 * defenders
 * duoeggwars
 * soloeggwars
 * bedwars
 * solobedwars
 * duobedwars
 * blockparty
 */