import { Router } from "express";
import pokemonController from "./controllers/pokemonController.js";
import typeController from "./controllers/typeController.js";
import teamController from "./controllers/teamController.js";
import controllerWrapper from "./middlewares/controllerWrapper.js";

const router = Router();

router.get("/pokemons", controllerWrapper(pokemonController.getAllPokemons));
router.get("/pokemons/:id", controllerWrapper(pokemonController.getPokemon));
router.get("/types", controllerWrapper(typeController.getAllTypes));
router.get("/types/:id", controllerWrapper(typeController.getType));
router.get("/types/:id/pokemons", controllerWrapper(typeController.getPokemonsByType));
router.get("/teams", controllerWrapper(teamController.getAllTeams));
router.get("/teams/:id", controllerWrapper(teamController.getTeam));
router.get("/teams/:id/pokemons", controllerWrapper(teamController.getPokemonsByTeam));

router.post("/teams", controllerWrapper(teamController.createTeam));
router.post('/teams/:teamId/pokemons/:pokemonId', controllerWrapper(teamController.addPokemonToTeam));

router.patch("/teams/:id", controllerWrapper(teamController.editTeam));

router.delete("/teams/:teamId/pokemons/:pokemonId", controllerWrapper(teamController.deletePokemonFromTeam));

export default router;
