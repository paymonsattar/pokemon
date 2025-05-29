import { SSTConfig } from "sst";
import { PokemonStack } from "./stacks/PokemonStack";

export default {

  config(_input) {
    return {
      name: "pokemon-app",
      region: "eu-west-1",
          bootstrap: {
          stackName: "SSTBootstrapPAPokemon"
        },
    };
  },
  stacks(app) {
    app.stack(PokemonStack);
  },
} satisfies SSTConfig;