import { SSTConfig } from "sst";
import { PokemonStack } from "./stacks/PokemonStack";

export default {
  config(_input) {
    return {
      name: "pokemon-app-paymon-andy",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(PokemonStack);
  },
} satisfies SSTConfig;