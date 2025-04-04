import  { Pokemon, Team, Type } from '../models/associations.js'; 

const pokemonController = {

  async getAllPokemons(req, res) {
    const pokemons = await Pokemon.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json(pokemons);
  },

  async getPokemon(req, res) {
    const id = parseInt(req.params.id);
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return res.status(404).json(`Ce Pokemon n'existe pas!`);
    }
    res.status(200).json(pokemon);
  }
};

export default pokemonController;

