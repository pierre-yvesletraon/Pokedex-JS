import api from "./api.js";
import modal from "./modal.js";
import toast from "./toast.js";

const typeModule = {

  async load() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const types = await api.getTypes();

    if (!types) {
      toast.error("Impossible de charger les types!");
      return;
    }
    
    const template = document.getElementById("typesTemplate");
    const container = template.content.cloneNode(true);
    
    const buttonsContainer = container.querySelector('[data-type="types-container"]');
    buttonsContainer.innerHTML = '';

    types.forEach(typeData => {
      const button = typeModule.createButton(typeData);
      buttonsContainer.append(button);
    });

    app.append(container);
  },

  createButton(typeData) {

    const button = document.createElement('button');
    button.className = 'button is-flex-grow-1 mx-2 type-button';
    button.style.backgroundColor = `#${typeData.color}`;
    
    const span = document.createElement('span');
    span.setAttribute('slot', 'type-name');
    span.textContent = typeData.name;
    
    button.append(span);

    button.addEventListener('click', () => typeModule.openTypePokemonModal(typeData));

    return button;
  },

  async openTypePokemonModal(typeData) {
    const pokemons = await api.getPokemonsByType(typeData.id);

    if (!pokemons || pokemons.length === 0) {
      toast.error(`Aucun Pokémon trouvé pour le type ${typeData.name}`);
      return;
    }

    document.querySelectorAll('.type-pokemon-modal').forEach(modal => modal.remove());

    const template = document.getElementById("typePokemonModalTemplate");
    const clone = template.content.cloneNode(true);

    clone.querySelector('.modal-card-title').textContent = `Pokémon de type ${typeData.name}`;

    const modalBody = clone.querySelector('.modal-card-body');
    
    pokemons.forEach(pokemon => {
      const cardTemplate = document.getElementById("pokemonCardTemplate");
      const cardClone = cardTemplate.content.cloneNode(true);

      cardClone.querySelector('[slot="pkm_img"]').src = `./assets/img/${pokemon.id}.webp`;
      cardClone.querySelector('[slot="pkm_card_content"]').textContent = pokemon.name;

      modalBody.append(cardClone);
    });

    document.body.append(clone);

    modal.init();
    modal.open(".type-pokemon-modal");
  }
};

export default typeModule;