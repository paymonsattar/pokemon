import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export interface PokemonSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  favouritePokemon: string;
  whyFavourite: string;
  submittedAt: string;
}

export class PokemonDB {
  constructor(private tableName: string) {}

  async saveSubmission(submission: PokemonSubmission): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...submission,
        submittedAt: new Date().toISOString(),
      },
    });

    await docClient.send(command);
  }

  async getSubmission(id: string): Promise<PokemonSubmission | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await docClient.send(command);
    return result.Item as PokemonSubmission || null;
  }
}

export const pokemonDB = new PokemonDB(process.env.POKEMON_TABLE_NAME!);