import { StackContext, Api, StaticSite, Table } from "sst/constructs";

export function PokemonStack({ stack }: StackContext) {
  // Create DynamoDB table
  const table = new Table(stack, "PokemonSubmissions", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  // Create API
  const api = new Api(stack, "PokemonApi", {
    defaults: {
      function: {
        bind: [table],
        environment: {
          POKEMON_TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "POST /submit": "packages/functions/src/pokemon.handler",
      "OPTIONS /submit": "packages/functions/src/pokemon.handler",
    },
    cors: {
      allowCredentials: false, // Changed from true to false
      allowHeaders: ["content-type"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowOrigins: ["*"],
    },
  });

  // Create frontend site
  const site = new StaticSite(stack, "PokemonSite", {
    path: "packages/frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
    TableName: table.tableName,
  });

  return {
    api,
    site,
    table,
  };
}