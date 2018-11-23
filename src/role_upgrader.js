module.exports = {
    loop: creep => {
        let mem = creep.memory;

        // Validate and update memory
        if (!_.isBoolean(mem.role.data.upgrading)) { mem.role.data.upgrading = false; }
        if (!_.isString(mem.role.data.controller)) { mem.role.data.controller = creep.room.controller.id; }
        if (_.sum(creep.carry) === creep.carryCapacity) { mem.role.data.upgrading = true; }
        else { mem.role.data.upgrading = false; }

        // Main logic
        if (mem.role.data.upgrading === true) {
            let target = Game.getObjectById(mem.role.data.controller);
            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) { creep.travelTo(target); }
        } else {
            let target = Game.spawns[_.keys(Game.spawns)[0]];
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) { creep.travelTo(target); }
        }
    }
};
