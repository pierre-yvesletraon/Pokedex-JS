import api from "./api.js";
import modal from "./modal.js";
import toast from "./toast.js";

const team = {
  async load() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const teams = await api.getTeams();
    if (!teams) {
      toast.error("Impossible de charger les équipes!");
      return;
    }
    
    teams.forEach(teamData => {
      const teamElement = team.createTeamElement(teamData);
      app.append(teamElement);
    });
  },

  createTeamElement(teamData) {
    const template = document.getElementById("teamTemplate");
    const clone = template.content.cloneNode(true);

    const section = clone.querySelector('section');
    section.id = `team-${teamData.id}`;
    
    clone.querySelector('.team-name').textContent = teamData.name;
    clone.querySelector('.team-description').textContent = teamData.description;
    
    team.seedPokemonImages(teamData.pokemons, clone.querySelector('.imgContainer'));
    
    clone.querySelector('.btnModalTeam').addEventListener('click', () => team.openModal(teamData));
    
    return clone;
  },

  seedPokemonImages(pokemons, container) {
    container.innerHTML = '';
    pokemons.forEach(pokemon => {
      const figure = document.createElement('figure');
      figure.className = 'image is-64x64 mx-2';
      const img = document.createElement('img');
      img.src = `./assets/img/${pokemon.id}.webp`;
      img.className = 'is-rounded';
      figure.append(img);
      container.append(figure);
    });
  },

  async editTeam(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const teamId = form.dataset.teamId;

    const updatedTeam = await api.editTeam(teamId, data);
    if (updatedTeam === null) {
      toast.error("Impossible de modifier le nom de l'équipe !");
      return;
    }

    team.updateTeamDisplay(updatedTeam);
    modal.close();
    form.reset();
    toast.success("Le nom de l'équipe a bien été modifié !");
  },

  async deletePokemonFromTeam(teamId, pokemonId) {
    try {
        const confirm = window.confirm("Êtes-vous sûr de vouloir retirer ce Pokémon de l'équipe ?");
        if (!confirm) return;

        const updatedTeam = await api.deletePokemonFromTeam(teamId, pokemonId);
        if (updatedTeam) {
            toast.success(`Le Pokémon a été retiré de l'équipe ${updatedTeam.name}`);
            modal.close();
            team.updateTeamDisplay(updatedTeam);
            team.updateMainDisplay(updatedTeam);
        }
    } catch (error) {
        if (error.message.includes("n'est pas dans l'équipe")) {
          const freshTeam = await api.getTeam(teamId);
          team.updateTeamDisplay(freshTeam);
          team.updateMainDisplay(freshTeam);
        }
        toast.error(error.message);
    }
  },

  updateMainDisplay(updatedTeam) {
    const teamElement = document.getElementById(`team-${updatedTeam.id}`);
    if (teamElement) {
      teamElement.querySelector('.team-name').textContent = updatedTeam.name;
      teamElement.querySelector('.team-description').textContent = updatedTeam.description;
      const imgContainer = teamElement.querySelector('.imgContainer');
      team.seedPokemonImages(updatedTeam.pokemons, imgContainer);
    }
  },

  async updateTeamDisplay(updatedTeam) {
    const freshTeam = await api.getTeam(updatedTeam.id);
    if (!freshTeam) {
      toast.error("Impossible de mettre à jour l'affichage de l'équipe");
      return;
    }
  
    const teamElement = document.getElementById(`team-${freshTeam.id}`);
    if (teamElement) {
      teamElement.querySelector('.team-name').textContent = freshTeam.name;
      teamElement.querySelector('.team-description').textContent = freshTeam.description;
      team.seedPokemonImages(freshTeam.pokemons, teamElement.querySelector('.imgContainer'));
    }
  
    const modalElement = document.querySelector(`#team-modal-${freshTeam.id}`);
    if (modalElement) {
      modalElement.querySelector('.team_name').textContent = freshTeam.name;
      modalElement.querySelector('.team_description').textContent = freshTeam.description;
      team.seedTeamTable(freshTeam, modalElement.querySelector('#tbody_team'));
    }
  },

  async openModal(teamData) {
    const freshTeamData = await api.getTeam(teamData.id);
    if (!freshTeamData) {
      toast.error("Impossible de charger les données de l'équipe");
      return;
    }
    
    const modalContent = team.createModalContent(freshTeamData);
    document.body.append(modalContent);
    modal.init();
    modal.open(`#team-modal-${freshTeamData.id}`);
  },

  createModalContent(teamData) {
    const template = document.getElementById("teamModalTemplate");
    const clone = template.content.cloneNode(true);
    
    const modalId = `team-modal-${teamData.id}`;
    clone.querySelector('.team-modal').id = modalId;
    
    team.loadNameEditing(clone, teamData);
    clone.querySelector('.team_description').textContent = teamData.description;
    
    const tbody = clone.querySelector('#tbody_team');
    team.seedTeamTable(teamData, tbody);
    
    return clone;
  },

  loadNameEditing(element, teamData) {
    const teamNameElement = element.querySelector('.team_name');
    teamNameElement.textContent = teamData.name;
    
    const editIcon = document.createElement('i');
    editIcon.className = 'fa fa-pencil ml-2';
    editIcon.style.cursor = 'pointer';
    editIcon.style.fontSize = '0.8em';
    teamNameElement.append(editIcon);
  
    const form = team.createEditForm(teamData);
    teamNameElement.append(form);
  
    editIcon.addEventListener('click', () => {
      teamNameElement.textContent = '';
      teamNameElement.append(form);
      form.style.display = 'flex';
      form.querySelector('input').focus();
    });
  },

  createEditForm(teamData) {
    const form = document.createElement('form');
    form.dataset.teamId = teamData.id;
    form.style.display = 'none';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.value = teamData.name;
    input.className = 'input';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'button is-small is-primary ml-2';
    submitButton.textContent = 'Sauvegarder';
    
    form.append(input, submitButton);
    form.addEventListener('submit', (event) => team.editTeam(event));
    
    return form;
  },

  seedTeamTable(teamData, tbody) {
    tbody.innerHTML = '';
    teamData.pokemons.forEach(pokemon => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pokemon.id}</td>
        <td>${pokemon.name}</td>
        <td>${pokemon.hp}</td>
        <td>${pokemon.atk}</td>
        <td>${pokemon.def}</td>
        <td>${pokemon.atk_spe}</td>
        <td>${pokemon.def_spe}</td>
        <td>${pokemon.speed}</td>
        <td>${pokemon.types ? pokemon.types.map(type => type.name).join(', ') : ''}</td>
        <td><i class="fa fa-trash delete-pokemon" data-team-id="${teamData.id}" data-pokemon-id="${pokemon.id}"></i></td>
      `;
      tr.querySelector('.delete-pokemon').addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        const teamId = event.currentTarget.dataset.teamId;
        const pokemonId = event.currentTarget.dataset.pokemonId;
        team.deletePokemonFromTeam(teamId, pokemonId);
      });
      tbody.append(tr);
    });

    tbody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-pokemon')) {
        const teamId = event.target.dataset.teamId;
        const pokemonId = event.target.dataset.pokemonId;
        team.deletePokemonFromTeam(teamId, pokemonId);
      }
    });
  }
};

export default team;
