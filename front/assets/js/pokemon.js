import api from "./api.js";
import modal from "./modal.js";
import toast from "./toast.js";
import team from "./team.js";

const pokemon = {

  async load() {
    const pokemons = await api.getPokemons();
    if (!pokemons) {
      toast.error("Impossible de charger les pokémons!");
      return;
    }
    pokemon.displayPokemons(pokemons);
  },

  async loadTeams() {
    const teams = await api.getTeams();
    if (!teams) {
      toast.error("Impossible de charger les équipes!");
      return [];
    }
    return teams;
  },

  displayPokemons(pokemons) {
    const app = document.getElementById("app");
    app.innerHTML = '';
    pokemons.forEach(pokemonData => pokemon.addToDOM(pokemonData));
  },

  async seedTeamSelect(selectElement) {
    const teams = await pokemon.loadTeams();
    selectElement.innerHTML = '';
    teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = team.name;
      selectElement.append(option);
    });
  },
  
  async addPokemonToTeam(pokemonId, teamId) {
    try {
      const updatedTeam = await api.addPokemonToTeam(teamId, pokemonId);
      if (updatedTeam) {
        const addedPokemon = updatedTeam.pokemons.find(pokemon => pokemon.id === pokemonId);
        toast.success(`${addedPokemon.name} a été ajouté à l'équipe ${updatedTeam.name}`);
        modal.close();
        await team.updateTeamDisplay(updatedTeam);
      }
    } catch (error) {
      toast.error(error.message);
    }
  },

  addToDOM(pokemonData) {
      const template = document.getElementById("pokemonCardTemplate");

      const clone = template.content.cloneNode(true);

      clone.firstElementChild.id = "pokemon-" + pokemonData.id;
      
      clone.querySelector('[slot="pkm_img"]').src = `./assets/img/${pokemonData.id}.webp`;
      
      clone.querySelector('[slot="pkm_card_content"]').textContent = pokemonData.name;
  
      clone.querySelector('[slot="pkm_card_link"]').addEventListener("click", (event) => {
        event.preventDefault();
        pokemon.openModal(pokemonData);
    });
      document.getElementById("app").append(clone);
  },

  loadModalClone(pokemonData) {
    const template = document.getElementById("pokemonModalTemplate");
    const clone = template.content.cloneNode(true);
    clone.querySelector('[slot="pkm_name"]').textContent = pokemonData.name;
    clone.querySelector('[slot="pkm_img_modal"]').src = `./assets/img/${pokemonData.id}.webp`;
    return clone;
  },

  loadStats(clone, pokemonData) {
    const stats = {
      hp: pokemonData.hp,
      atk: pokemonData.atk,
      def: pokemonData.def,
      atk_spe: pokemonData.atk_spe,
      def_spe: pokemonData.def_spe,
      speed: pokemonData.speed
    };

    Object.entries(stats).forEach(([stat, value]) => {
      const progressElement = clone.querySelector(`.${stat}-progress`);
      if (progressElement) {
          progressElement.value = value;
      } else {
          console.error(`Élément non trouvé pour la stat: ${stat}`);
      }
    });
  },

  loadTeamSelector(clone, pokemonData) {
    const selectElement = clone.querySelector('select');
    pokemon.seedTeamSelect(selectElement);
  
    const addButton = clone.querySelector('.btn_add_team');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedTeamId = selectElement.value;
      if (selectedTeamId) {
        pokemon.addPokemonToTeam(pokemonData.id, selectedTeamId);
      } else {
        toast.error("Veuillez sélectionner une équipe");
      }
    });
  },

  openModal(pokemonData) {
    document.querySelectorAll('.modal-container').forEach(modal => modal.remove());
    
    const clone = pokemon.loadModalClone(pokemonData);
    pokemon.loadStats(clone, pokemonData);
    pokemon.loadTeamSelector(clone, pokemonData);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.append(clone);
    document.body.append(modalContainer);

    modal.init();
    modal.open(".pokemon-modal");
  }
};

export default pokemon; 
  
