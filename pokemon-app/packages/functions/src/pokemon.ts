import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { pokemonDB } from "./lib/db.js";
import { pokemonSubmissionSchema } from "../../shared/src/schemas/pokemon.js";
import { randomUUID } from "crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log("Event:", JSON.stringify(event, null, 2));

  // Get HTTP method from the correct location
  const httpMethod = event.requestContext.http.method;
  console.log("HTTP Method:", httpMethod);

  // Handle CORS preflight
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  // Only allow POST requests
  if (httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const requestData = JSON.parse(event.body);
    console.log("Request data:", requestData);

    // Validate using Zod schema
    const validationResult = pokemonSubmissionSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.errors);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Validation failed",
          details: validationResult.error.errors,
        }),
      };
    }

    const validatedData = validationResult.data;

    // Create submission with unique ID
    const submission = {
      id: randomUUID(),
      ...validatedData,
      submittedAt: new Date().toISOString(),
    };

    // Save to DynamoDB
    await pokemonDB.saveSubmission(submission);

    console.log("Submission saved successfully:", submission.id);

    // Return success response
    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: "Submission saved successfully",
        submissionId: submission.id,
        favouritePokemon: validatedData.favouritePokemon,
      }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};