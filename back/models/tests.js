import "dotenv/config";
import { Pokemon } from './associations.js';

const pokemons = await Pokemon.findAll();
console.log(pokemons);