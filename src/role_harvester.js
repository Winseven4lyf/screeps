module.exports = {
    loop: function (creep) {
        let mem = creep.memory;

        // Validate and update memory
        if (!_.isBoolean(mem.role.data.harvesting)) { mem.role.data.harvesting = true; }
        if (_.sum(creep.carry) === creep.carryCapacity) {
            mem.role.data.harvesting = false;
        } else {
            mem.role.data.harvesting = true;
        }

        // Main logic
        if (mem.role.data.harvesting === true) {
            let source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            let target = Game.spawns[_.keys(Game.spawns)[0]];
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};
