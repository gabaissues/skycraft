const puppeteer = require('puppeteer')
const chalk = require('chalk')

let log = console.log

let error = chalk.bold.red

const { minigames, profileInputs } = require('../config.json')

async function start(options) {

    try {

        let show = options.show
        if (show == true && show == false) show = false

        const browser = await puppeteer.launch({ headless: !show });
        return browser

    } catch (e) {

        throw new TypeError("Há uma falha nos parametros utilizados na função de autenticação.");

    }

}

async function searchPage(options) {

    try {

        const page = await options.response.newPage()
        for (let i in minigames) {

            if (minigames[i].minigame === options.minigame.toLowerCase()) {

                confirm = true
                await page.goto(`https://skycraft.com.br/ranks/mg/${minigames[i].code}/${options.temporada}/pagina/${options.page}/ordem/1/1`)

                let data = await page.evaluate(() => {

                    const tds = Array.from(document.querySelectorAll('table tr'))
                    return tds.map(td => td.innerText)

                });

                let result = []

                let removing = data.slice(1, data.length)
                for (let i in removing) {

                    let a = removing[i].replace(/\n/g, '').replace(/\t/g, ' ')
                    let recorte = a.split(' ')

                    result.push(recorte)

                }

                setTimeout(() => {

                    if (result) {

                        return;

                    } else {

                        throw new TypeError("O tempo máximo de uma request foi obtido, sua internet está muito lenta.");

                    }

                }, 3000)

                page.close()
                return result

            }

        }


    } catch (e) {

        throw new TypeError("Há uma falha nos parametros utilizados na função de autenticação.");

    }

}

async function auth(options) {

    try {

        const page = await options.response.newPage()
        await page.goto('https://forum.skycraft.com.br/index.php?app=core&module=global&section=login')

        let user = String(options.user)
        let pass = String(options.pass)

        await page.evaluate(async (user, pass) => {

            document.getElementById('ips_username').value = user
            document.getElementById('ips_password').value = pass

        }, user, pass)

        await page.click('input[type=submit]')

        setTimeout(() => {

            if (page.url() === "https://forum.skycraft.com.br/index.php?") {

                page.close()
                return { user, pass }

            } else {

                page.close()
                throw new SyntaxError("O usuário inseriu credenciais inválidas, o que ocasionou em má falha no sistema.");

            }

        }, 4000)

    } catch (e) {

        throw new SyntaxError("Há uma falha nos parametros utilizados na função de autenticação.");

    }


}

async function changeProfile(options) {

    try {

        let page = await options.response.newPage()

        setTimeout(async () => {

            await page.goto('https://forum.skycraft.com.br/index.php?app=core&module=usercp&tab=core')

            let value = String(options.value)
            let change = options.change

            let confirm = false

            for (let i in profileInputs.config) {

                switch (change.toLowerCase()) {

                    case profileInputs.config[i].value:

                        let id = String(profileInputs.config[i].id)
                        await page.evaluate((id, value) => {

                            document.getElementById(id).value = value

                        }, id, value)

                        confirm = true


                        break;
                    case "sexo":

                        for (let i in profileInputs.sexo) {

                            if (profileInputs.sexo[i].value === options.value.toLowerCase()) {

                                await page.select('#field_5', profileInputs.sexo[i].id)
                                confirm = true

                            }
                        }

                        break;
                    case "area":

                        for (let i in profileInputs.areas) {

                            if (profileInputs.areas[i].value === options.value.toLowerCase()) {

                                await page.select('#field_11', profileInputs.areas[i].id)
                                confirm = true

                            }

                        }

                        break;

                }

            }

            if (confirm === false) {

                throw new SyntaxError("Há uma falha nos parametros utilizados, não há nada para alterar com o nome correspondente.");

            } else {

                await page.click('input[name="submitForm"]')

                setTimeout(() => {

                    page.close()

                }, 1000)

            }

        }, 2000)

    } catch (e) {

        throw new SyntaxError("Há uma falha nos parametros utilizados.");

    }

}

async function getProfile(options) {

    return new Promise(async (res, rej) => {
        
        try {

            let page = await options.response.newPage()
            await page.goto(`https://forum.skycraft.com.br/index.php?app=core&module=search&do=search&andor_type=&sid=429b53ebbb0a89ace04dba17b9252f99&search_app_filters[forums][sortKey]=date&search_app_filters[forums][sortKey]=date&search_app_filters[forums][searchInKey]=&search_term=${options.user}&search_app=members`)

            await page.click('img[alt="Foto"]').then(() => {}).catch(err => { throw new SyntaxError('SkyCraft retornou um bad request, provavel que o nick não exista.') })

            setTimeout(async () => {

                const avatar = await page.evaluate(() => document.getElementById('profile_photo').src)
                const infoProfile = await page.evaluate(() => document.getElementById('user_info_cell').textContent) 
                const whatIsMe = await page.evaluate(() => document.getElementById('about_me').textContent)
                const moldura = await page.evaluate(() => document.querySelector('img[alt="Reputação:"]').src)
                const estatisticas = await page.evaluate(() => Array.from(document.querySelectorAll('div.general_box ul li')).map(li => li.innerText))

                let estatisticasFormated = []
                let profileFormated = infoProfile.replace(/\n/g, ' ').replace('Última atividade:', '').replace('Cadastrado:', '').slice(options.user.length + 5, infoProfile.length)
                
                /* Funções */

                estatisticas.forEach(x => {

                    let formated = x
                        .replace(/\n/g, '')
                        .replace('(s)', '')
                        .replace(/(Grupo)|(Posts)|(Visualizações)|(Título)|(Tempo online)|(Idade)|(Nascimento)|(Sexo)|(Área)|(Localização)|(Site)|(Twitter)|(Instagram)|(Discord)|(Steam)|(\:)/g, '')

                    estatisticasFormated.push(formated)

                })

                function find(element) {

                    for(let i in estatisticas) {

                        if(estatisticas[i].includes(element)) return Number(i)

                    }

                }

                /* Informações */

                let data = profileFormated.slice(0, 11)
                let tipo = profileFormated.slice(12, 19)
                let on = profileFormated.slice(20, profileFormated.length) 

                let mensagem = whatIsMe.replace(/\n/g, '').slice(11, whatIsMe.length)

                /* Sobre */

                let grupo = estatisticasFormated[await find('Grupo')] || "Sem informações"
                let posts = estatisticasFormated[await find('Posts')] || "Sem informações"
                let views = estatisticasFormated[await find('Visualizações')] || "Sem informações"
                let tempo = estatisticasFormated[await find('Tempo online')] || "Sem informações"
                let titulo = estatisticasFormated[await find('Título')] || "Sem informações"
                let idade = estatisticasFormated[await find('Idade')] || "Sem informações"
                let nascimento = estatisticasFormated[await find('Nascimento')] || "Sem informações"
                let sexo = estatisticasFormated[await find('Sexo')].slice(1, estatisticasFormated[await find('Sexo')].length) || "Sem informações"
                let areas = estatisticasFormated[await find('Área(s)')] || "Sem informações"
                let localizacao = estatisticasFormated[await find('Localização')] || "Sem informações"
                let interesses = estatisticasFormated[await find('Interesses')] || "Sem informações"

                /* Redes */

                let site = estatisticasFormated[await find('Site')] ? estatisticasFormated[await find('Site')].slice(2, estatisticasFormated[await find('Site')].length) : "Sem informações"

                let twitter = estatisticasFormated[await find('Twitter')] ? estatisticasFormated[await find('Twitter')].slice(2, estatisticasFormated[await find('Twitter')].length) : "Sem informações"
                let discord = estatisticasFormated[await find('Discord')] ? estatisticasFormated[await find('Discord')].slice(2, estatisticasFormated[await find('Discord')].length) : "Sem informações"
                let twitch = estatisticasFormated[await find('Twitch')] ? estatisticasFormated[await find('Twitch')].slice(8, estatisticasFormated[await find('Twitch')].length) : "Sem informações"

                /* Retorno */

                const response = {
                    info: {
                        status: {
                            data,
                            tipo,
                            on
                        },
                        mensagem,
                        card: {
                            avatar,
                            moldura
                        }
                    },
                    sobre: {
                        grupo,
                        posts,
                        views,
                        tempo,
                        titulo,
                        idade,
                        nascimento,
                        sexo,
                        areas,
                        localizacao,
                        interesses
                    },
                    redes: {
                        site,
                        twitter,
                        discord,
                        twitch
                    },
                }
                
                res(response);

            }, 2200)

        } catch(e) {
           
            rej("Há uma falha nos parametros utilizados.");
        
        }
    })
}

module.exports = { start, searchPage } 