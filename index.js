const { searchPage, start, auth, getProfile, changeProfile } = require('./lib/api.js')

/**
 
 * @author Gabriel <ogabrielskJ@gmail.com>
 * @version 0.0.1
 * @url https://github.com/gbrsrs/skycraft

*/

module.exports = {
    start: start,
    searchPage: searchPage,
    auth: auth,
    getProfile: getProfile,
    changeProfile: changeProfile
}