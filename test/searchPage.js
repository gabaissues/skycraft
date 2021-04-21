const skycraft = require('skycraft')

//True = Mostra o processo do browser
//False = Esconde o processo do browser

skycraft.start({ show: false }).then(async (response) => {

    let result = await skycraft.searchPage({ response: response, minigame: 'blockparty', page: 1, temporada: 'mensal' })
    console.log(result)

    try {

        await auth({ response: response, user: 'gbrsrs', pass: 'senha' })

        //await changeProfile({ response: response, change: 'area', value: 'todos' })
        getProfile({ response: response, user: 'gbrsrs' }).then((profile) => {

            console.log(profile)

        }).catch(console.log)

    } catch (e) {

        console.log(e)

    }

})