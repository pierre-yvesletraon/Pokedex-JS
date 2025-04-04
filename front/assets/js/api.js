const api = {
  baseUrl: "http://localhost:3000",

  async getPokemons() {
      try {
          const response = await fetch(api.baseUrl + "/pokemons");
          if (!response.ok) {
              console.error(response);
              return null;
          }
          const data = await response.json();
          console.log("Données brutes reçues :", data);
          return data;
      } catch (error) {
          console.error(error);
          return null;
      }
  },

  async getTypes() {
    try {
        const response = await fetch(api.baseUrl + "/types");

        if (!response.ok) {
            console.error(response);
            return null;
        }
        const data = await response.json();
        console.log("Données brutes reçues :", data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async getPokemonsByType(typeId) {
    try {
        const response = await fetch(`${api.baseUrl}/types/${typeId}/pokemons`);

        if (!response.ok) {
            console.error(response);
            return null;
        }
        const data = await response.json();
        console.log(`Données des Pokémon pour le type ${typeId} :`, data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async getTeams() {
    try {
      const response = await fetch(api.baseUrl + "/teams");
      if (!response.ok) {
        console.error(response);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getTeam(teamId) {
    try {
        const response = await fetch(`${api.baseUrl}/teams/${teamId}?_embed=pokemons&_embed=types`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async getPokemonsByTeam(teamId) {
    try {
        const response = await fetch(`${api.baseUrl}/teams/${teamId}/pokemons`);

        if (!response.ok) {
            console.error(response);
            return null;
        }
        const data = await response.json();
        console.log(`Données des Pokémon pour l'équipe' ${typeId} :`, data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async createTeam(data) {
    try {
        const response = await fetch(api.baseUrl + '/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(response);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async editTeam(teamId, data) {
    try {
        const response = await fetch(`${api.baseUrl}/teams/${teamId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error(response);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  async addPokemonToTeam(teamId, pokemonId) {
    try {
        const response = await fetch(
            `${api.baseUrl}/teams/${teamId}/pokemons/${pokemonId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data || `Erreur HTTP: ${response.status}`;
            throw new Error(errorMessage);
        }
        return data;
    } catch (error) {
        console.error(`Erreur lors de l'ajout du Pokémon ${pokemonId} à l'équipe ${teamId}:`, error);
        throw new Error(error.message || "Connexion au serveur impossible");
    }
  },

  async deletePokemonFromTeam(teamId, pokemonId) {
    try {
        const response = await fetch(
            `${api.baseUrl}/teams/${teamId}/pokemons/${pokemonId}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data || `Erreur HTTP: ${response.status}`;
            throw new Error(errorMessage);
        }
        return data;
    } catch (error) {
        console.error(`Erreur lors de la suppression du Pokémon ${pokemonId} de l'équipe ${teamId}:`, error);
        throw new Error(error.message || "Connexion au serveur impossible");
    }
  }
};

export default api;