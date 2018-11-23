const ROLES = {
    harvester: require("role_harvester"),
    upgrader: require("role_upgrader")
};

module.exports = {
    loop: () => {
        _.forEach(Game.creeps, creep => {
            let mem = creep.memory;
            module.exports.ensureMemory(creep);
            const ROLE = ROLES[mem.role.name];
            if (_.isObject(ROLE) && _.isFunction(ROLE.loop)) {
                ROLE.loop(creep);
            }
        });
    },
    ensureMemory: creep => {
        let mem = creep.memory;
        if (!_.isObject(mem.role)) { mem.role = {}; }
        if (!_.isString(mem.role.name)) { mem.role.name = ""; }
        if (!_.isObject(mem.role.data)) { mem.role.data = {}; }
    }
};
