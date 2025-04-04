import { Type } from "../models/associations.js";

const typeController = {
  async getAllTypes(req, res) {
    const types = await Type.findAll({
      order: [["name", "ASC"]],
    });
    res.status(200).json(types);
  },

  async getType(req, res) {
    const id = parseInt(req.params.id);
    const type = await Type.findByPk(id, {
      include: "pokemons",
    });
    if (!type) {
      return res.status(404).json(`Ce type n'existe pas!`);
    }
    res.status(200).json(type);
  },

  async getPokemonsByType(req, res) {
    const id = parseInt(req.params.id);

    const type = await Type.findByPk(id, {
      include: {
        association: 'pokemons',
        through: { attributes: [] }
      }
    });

    if (!type) {
      return res.status(404).json("Type non trouvé");
    }
    res.status(200).json(type.pokemons);
  }
};

export default typeController;
