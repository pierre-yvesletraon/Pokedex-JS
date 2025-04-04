import api from "./api.js";
import modal from "./modal.js";
import toast from "./toast.js";
import team from "./team.js";

const addTeam = {
  load() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const template = document.getElementById("addTeamModalTemplate");
    const clone = template.content.cloneNode(true);
    app.append(clone);

    const form = document.getElementById('form_team_modal');
    form.addEventListener('submit', addTeam.handleAdd);

    modal.init();
    modal.open('#add_team_modal');
  },

  async handleAdd(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const newTeam = await api.createTeam(data);
    if (newTeam) {
      toast.success("Équipe créée avec succès!");
      modal.close();
      team.load();
    } else {
      toast.error("Erreur lors de la création de l'équipe");
    }
  }
};

export default addTeam;