import Joi from "joi";
import { Team, Pokemon, Type } from "../models/associations.js";

const teamController = {
  async getAllTeams(req, res) {
    const teams = await Team.findAll({
      order: [["id", "ASC"]],
      include: "pokemons",
    });
    res.status(200).json(teams);
  },

  async getTeam(req, res) {
    const id = parseInt(req.params.id);
    const team = await Team.findByPk(id, {
      include: {
        model: Pokemon,
        as: 'pokemons',
        include: {
          model: Type,
          as: 'types',
          through: { attributes: [] }
        }
      }
    });
    if (!team) {
      return res.status(404).json("Cette équipe n'existe pas!");
    }
    res.status(200).json(team);
  },

  async getPokemonsByTeam(req, res) {
    const id = parseInt(req.params.id);

    const team = await Team.findByPk(id, {
      include: {
        association: 'pokemons',
        through: { attributes: [] }
      }
    });

    if (!team) {
      return res.status(404).json("Equipe non trouvée");
    }
    res.status(200).json(team.pokemons);
  },

  async deletePokemonFromTeam(req, res) {
      const teamId = parseInt(req.params.teamId);
      const pokemonId = parseInt(req.params.pokemonId);

      const team = await Team.findByPk(teamId);
      const pokemon = await Pokemon.findByPk(pokemonId);

      if (!team || !pokemon) {
          return res.status(404).json("Équipe ou Pokémon non trouvé(e)!");
      }

      const isInTeam = await team.hasPokemon(pokemonId);
      if (!isInTeam) {
          return res.status(400).json("Ce Pokémon n'est pas dans l'équipe!");
      }
      await team.removePokemon(pokemon);

      const updatedTeam = await Team.findByPk(teamId, {
          include: 'pokemons'
      });
      res.status(200).json(updatedTeam);
  },

  validate(req) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required().messages({
        "string.base": "Le nom doit être une chaîne",
        "string.empty": "Le nom est obligatoire",
        "string.min": "Le nom doit faire 3 caractères minimum",
        "string.max": "Le nom doit faire 255 caractères maximum"
      }),
      description: Joi.string().min(3).max(500).allow('').optional().messages({
        "string.min": "La description doit faire 3 caractères minimum",
        "string.max": "La description doit faire 500 caractères maximum"
      })
    });

    return schema.validate(req.body, { abortEarly: false }).error;
  },

  async createTeam(req, res, next) {
    const error = teamController.validate(req);
    if (error) {
        return next(error);
    }
    const result = await Team.create(req.body);
    res.status(201).json(result);
  },

  async editTeam(req, res, next) {
    const error = teamController.validate(req);
    if (error) {
        return next(error);
    }
    const team = await Team.findByPk(req.params.id);
    if (!team) {
        return next();
    }
    const { name } = req.body;
    if (name) {
        team.name = name;
    }
    await team.save();
    res.status(200).json(team);
  },

  async addPokemonToTeam(req, res) {
    const teamId = parseInt(req.params.teamId);
    const pokemonId = parseInt(req.params.pokemonId);

    const team = await Team.findByPk(teamId);
    const pokemon = await Pokemon.findByPk(pokemonId);

    if (!team || !pokemon) {
      return res.status(404).json("Équipe ou Pokémon non trouvé(e)!");
    }

    const existing = await team.hasPokemon(pokemonId);
    if (existing) {
      return res.status(400).json("Ce Pokémon est déjà dans l'équipe!");
    }

    const count = await team.countPokemons();
    if (count >= 6) {
      return res.status(400).json("L'équipe est déjà complète (6 Pokémon maximum)");
    }

    await team.addPokemon(pokemon);

    const updatedTeam = await Team.findByPk(teamId, {
      include: 'pokemons'
    });

    res.status(200).json(updatedTeam);
  }
};

export default teamController;
