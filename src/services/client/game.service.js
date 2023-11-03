import createApiClient from "../api.service";

class GameServiceClient {

  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAllRanking() {
    return (await this.api.get("/ranking")).data;
  }

  async create(data) {
    return (await this.api.post('/sudoku/create', data)).data;
  }

  async solve(data) {
    return (await this.api.patch('/sudoku/solve', data)).data;
  }

}

const gameService = new GameServiceClient();

export default gameService; 