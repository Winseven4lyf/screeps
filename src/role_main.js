const ROLES = {
    harvester: require("role_harvester")
};

module.exports = {
    loop: function (creeps) {
        _.forEach(creeps, (creep) => {
            let mem = creep.memory;
            module.exports.ensureMemory(creep);
            const ROLE = ROLES[mem.role.name];
            if (_.isObject(ROLE) && _.isFunction(ROLE.loop)) {
                ROLE.loop(creep);
            }
        });
    },
    ensureMemory: function (creep) {
        let mem = creep.memory;
        if (!_.isObject(mem.role)) { mem.role = {}; }
        if (!_.isString(mem.role.name)) { mem.role.name = ""; }
        if (!_.isObject(mem.role.data)) { mem.role.data = {}; }
    }
};
