import { sequelize } from "./connection.js";
import { Pokemon } from "./Pokemon.js";
import { Team } from "./Team.js";
import { Type } from "./Type.js";

Pokemon.belongsToMany(Team, { as: 'teams', through: 'pokemon_team', foreignKey: 'pokemon_id', otherKey: 'team_id' });
Team.belongsToMany(Pokemon, { as: 'pokemons', through: 'pokemon_team', foreignKey: 'team_id', otherKey: 'pokemon_id' });

Pokemon.belongsToMany(Type, { as: 'types', through: 'pokemon_type', foreignKey: 'pokemon_id', otherKey: 'type_id'});
Type.belongsToMany(Pokemon, { as: 'pokemons', through: 'pokemon_type', foreignKey: 'type_id', otherKey: 'pokemon_id' });

export { sequelize, Pokemon, Team, Type };