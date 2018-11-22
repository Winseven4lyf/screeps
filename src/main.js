const TRAVELER = require("Traveler");
const ROLE = require("role_main");

module.exports = {
    loop: function () {
        ROLE.loop(Game.creeps);
    }
};
