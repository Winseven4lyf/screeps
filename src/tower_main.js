module.exports = {
    loop: () => {
        if (_.find(Game.structures, { structureType: STRUCTURE_TOWER })) {
            _.forEach(Game.rooms, room => {
                let towers = room.find(FIND_MY_STRUCTURES,
                    { filter: { structureType: STRUCTURE_TOWER } }
                );

                // Attack hostile creeps
                let hostiles = room.find(FIND_HOSTILE_CREEPS);
                if (hostiles.length > 0) {
                    _.forEach(towers, tower => {
                        tower.attack(_.sample(hostiles));
                    });
                } else {
                    // Heal owned creeps
                    let hurt = _.filter(room.find(FIND_MY_CREEPS),
                        creep => creep.hits < creep.hitsMax
                    );
                    if (hurt.length > 0) {
                        _.forEach(towers, tower => {
                            tower.heal(_.sample(hurt));
                        });
                    } else {
                        // Repair owned structures
                        let damaged = _.filter(room.find(FIND_MY_STRUCTURES),
                            structure => structure.hits < structure.hitsMax
                        );
                        if (damaged.length > 0) {
                            _.forEach(towers, tower => {
                                tower.repair(_.sample(damaged));
                            });
                        } else {
                            // Repair walls
                            let damagedWalls = _.filter(room.find(FIND_STRUCTURES,
                                { filter: { structureType: STRUCTURE_WALL } }),
                                wall => wall.hits < wall.hitsMax
                            );
                            if (damagedWalls.length > 0) {
                                _.sortBy(damagedWalls, "hits");
                                _.forEach(towers, tower => {
                                    tower.repair(_.first(damagedWalls));
                                });
                            }
                        }
                    }
                }
            });
        }
    }
};
