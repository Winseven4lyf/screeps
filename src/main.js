const TRAVELER = require("Traveler");
const ROLE = require("role_main");
const TOWER = require("tower_main");

module.exports = {
    loop: function () {
        ROLE.loop(Game.creeps);
        TOWER.loop();
    }
};
