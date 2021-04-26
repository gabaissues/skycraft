const puppeteer = require('puppeteer')
const { minigames, profileInputs } = require('../config.json')

class Client {
    constructor(options) {

        try {

            const browser = puppeteer.launch({ headless: !options.show })
            this.browser = browser

        } catch (e) {

            throw new SyntaxError("Há uma falha nos parametros utilizados na inicialização, serei incapaz de concluir o iniciamento.")

        }

    }

    auth(options) {

        return new Promise(async (res, rej) => {

            try {

                let browser = await this.browser
                let time = options.maxTimeout ? options.maxTimeout : 2000

                const page = await browser.newPage()
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
                        res({ user: user, pass: pass })

                    } else {

                        page.close()
                        rej("Credencias inválidas, serei incapaz de concluir a authenticação.");

                    }

                }, time)

            } catch (e) {

                rej("Credencias inválidas, serei incapaz de concluir a authenticação.");

            }

        })

    }

    searchPage(options) {

        return new Promise(async (res, rej) => {

            try {

                let browser = await this.browser
                let time = options.maxTimeout ? options.maxTimeout : 200

                const page = await browser.newPage()
                for (let i in minigames) {

                    if (minigames[i].minigame === options.minigame.toLowerCase()) {

                        await page.goto(`https://skycraft.com.br/ranks/mg/${minigames[i].code}/${options.temporada}/pagina/${options.page}/ordem/1/1`)
                        await page.waitForSelector('table tr')

                        let data = await page.evaluate(() => {

                            const tds = Array.from(document.querySelectorAll('table tr'))
                            return tds.map(td => td.innerText)

                        });

                        let removing = data.slice(1).map(a => a.replace(/\n/g, '').replace(/\t/g, ' ').split(' '))

                        await page.close()
                        setTimeout(() => res(removing), time)

                    }

                }

            } catch (e) {

                rej('Há uma falha nos parametros utilizados, verifique-os.')

            }
        })

    }

    async changeProfile(options) {

        let browser = await this.browser
        let page = await browser.newPage()

        let time = options.maxTimeout ? options.maxTimeout : 200

        await page.goto('https://forum.skycraft.com.br/index.php?app=core&module=usercp&tab=core')

        let value = String(options.value)
        let change = String(options.change)

        let confirm = true

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

        setTimeout(async () => {

            if (confirm === false) {

                throw new SyntaxError("Há uma falha nos parametros utilizados, não há nada para alterar com o nome correspondente.");

            } else {

                await page.click('input[name="submitForm"]')
                await page.close()

            }

        }, time)
    }

    getProfile(options) {

        return new Promise(async (res, rej) => {

            try {

                let browser = await this.browser
                let page = await browser.newPage()
                let time = options.maxTimeout ? options.maxTimeout : 800

                await page.goto(`https://forum.skycraft.com.br/index.php?app=core&module=search&do=search&andor_type=&sid=429b53ebbb0a89ace04dba17b9252f99&search_app_filters[forums][sortKey]=date&search_app_filters[forums][sortKey]=date&search_app_filters[forums][searchInKey]=&search_term=${options.user}&search_app=members`)

                const members = await page.$$('a[hovercard-ref="member"]');
                let confirm = false

                for (let i of members) {

                    if (confirm === true) {

                        return;

                    } else {

                        const a = await page.evaluate(e => e.getAttribute("href"), i);
                        if (a.includes(options.user.toLowerCase())) {

                            confirm = true
                            await page.goto(a)

                            const avatar = await page.evaluate(() => document.getElementById('profile_photo').src)
                            const infoProfile = await page.evaluate(() => document.getElementById('user_info_cell').textContent)
                            const whatIsMe = await page.evaluate(() => document.getElementById('about_me').textContent)
                            const estatisticas = await page.evaluate(() => Array.from(document.querySelectorAll('div.general_box ul li')).map(li => li.innerText))

                            let estatisticasFormated = []
                            let profileFormated = infoProfile.replace(/\n/g, ' ').replace('Última atividade:', '').replace('Cadastrado:', '').slice(options.user.length + 5)

                            estatisticas.forEach(x => {

                                let formated = x
                                    .replace(/\n/g, '')
                                    .replace('(s)', '')
                                    .replace(/(Grupo)|(Posts)|(Visualizações)|(Interesses)|(Título)|(Tempo online)|(Idade)|(Nascimento)|(Sexo)|(Área)|(Localização)|(Site)|(Twitter)|(Instagram)|(Discord)|(Steam)|(\:)/g, '')

                                estatisticasFormated.push(formated)

                            })

                            function find(element) {

                                for (let i in estatisticas) {

                                    if (estatisticas[i].includes(element)) return Number(i)

                                }

                            }

                            let data = profileFormated.slice(0, 11)
                            let tipo = profileFormated.slice(12, 19)
                            let on = profileFormated.slice(20)

                            let mensagem = whatIsMe.replace(/\n/g, '').slice(11)

                            let grupo = estatisticasFormated[await find('Grupo')] || "Sem informações"
                            let posts = estatisticasFormated[await find('Posts')] || "Sem informações"
                            let views = estatisticasFormated[await find('Visualizações')] || "Sem informações"
                            let tempo = estatisticasFormated[await find('Tempo online')] || "Sem informações"
                            let titulo = estatisticasFormated[await find('Título')] || "Sem informações"
                            let idade = estatisticasFormated[await find('Idade')] || "Sem informações"
                            let nascimento = estatisticasFormated[await find('Nascimento')] || "Sem informações"
                            let sexo = estatisticasFormated[await find('Sexo')].slice(1) || "Sem informações"
                            let areas = estatisticasFormated[await find('Área(s)')] || "Sem informações"
                            let localizacao = estatisticasFormated[await find('Localização')] || "Sem informações"
                            let interesses = estatisticasFormated[await find('Interesses')] || "Sem informações"

                            let site = estatisticasFormated[await find('Site')] ? estatisticasFormated[await find('Site')].slice(2) : "Sem informações"
                            let twitter = estatisticasFormated[await find('Twitter')] ? estatisticasFormated[await find('Twitter')].slice(2) : "Sem informações"
                            let discord = estatisticasFormated[await find('Discord')] ? estatisticasFormated[await find('Discord')].slice(2) : "Sem informações"
                            let twitch = estatisticasFormated[await find('Twitch')] ? estatisticasFormated[await find('Twitch')].slice(8) : "Sem informações"
                            let devianArt = estatisticasFormated[await find('DevianArt')] ? estatisticasFormated[await find('DevianArt')].slice(11) : "Sem informações"
                            let skype = estatisticasFormated[await find('Skype')] ? estatisticasFormated[await find('Skype')].slice(7) : "Sem informações"
                            let facebook = estatisticasFormated[await find('Facebook')] ? estatisticasFormated[await find('Facebook')].slice(10) : "Sem informações"

                            const response = {
                                info: {
                                    status: {
                                        data,
                                        tipo,
                                        on
                                    },
                                    mensagem,
                                    card: {
                                        avatar
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
                                    twitch,
                                    devianArt,
                                    skype,
                                    facebook
                                },
                            }

                            await page.close()
                            res(response);

                        }

                    }

                }

                setTimeout(() => rej('O usuário inserido não existe, portanto, a busca não foi concluida com sucesso.'), time)

            } catch (e) {

                rej('Há uma falha nos parametros utilizados, verifique-os.')

            }

        })

    }

}

module.exports = { Client } 