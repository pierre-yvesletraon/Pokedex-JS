import modal from "./modal.js";
import pokemon from "./pokemon.js";
import typeModule from "./type.js";
import team from "./team.js";
import addTeam from "./addTeam.js";
import toast from "./toast.js";

const app = {
  init() {
    modal.init();
    toast.init();
    app.bind();
    app.showHome();
  },

  bind() {
    document.getElementById('nav-item-home').addEventListener('click', () => app.showHome());
    document.getElementById('nav-item-type').addEventListener('click', () => typeModule.load());
    document.getElementById('nav-item-team').addEventListener('click', () => team.load());
    document.getElementById('nav-item-add-team').addEventListener('click', () => addTeam.load());
  },

  showHome() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    pokemon.load();
  }
};

document.addEventListener("DOMContentLoaded", app.init);



