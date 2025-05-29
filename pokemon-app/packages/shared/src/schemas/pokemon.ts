import { z } from "zod";

// Name validation schema (for first and last name)
const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(30, "Name must be no more than 30 characters")
  .regex(/^[A-Za-z\s\-]+$/, "Name can only contain letters, spaces, and hyphens");

// Date validation helper
const dateStringSchema = z
  .string()
  .min(1, "Date of birth is required")
  .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, "Date must be in DD/MM/YYYY format")
  .refine((dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Check if date is valid
    if (date.getDate() !== day || date.getMonth() !== (month - 1) || date.getFullYear() !== year) {
      return false;
    }
    
    // Check if date is not in the future
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    return date <= today;
  }, "Date of birth cannot be in the future");

// List of original 150 Pokémon
export const ORIGINAL_150_POKEMON = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
  "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
  "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
  "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
  "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
  "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
  "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
  "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
  "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
  "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
  "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo",
  "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
  "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
  "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
  "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
  "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela",
  "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
  "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
  "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto",
  "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
  "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
  "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
] as const;

// Pokemon enum type
export const pokemonEnum = z.enum(ORIGINAL_150_POKEMON);

// Main form schema
export const pokemonSubmissionSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  dateOfBirth: dateStringSchema,
  favouritePokemon: pokemonEnum,
  whyFavourite: z
    .string()
    .min(1, "Please tell us why this Pokémon is your favourite"),
});

// Type inference from schema
export type PokemonSubmission = z.infer<typeof pokemonSubmissionSchema>;
export type PokemonName = z.infer<typeof pokemonEnum>;