"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonSubmissionSchema = exports.pokemonEnum = exports.ORIGINAL_150_POKEMON = void 0;
const zod_1 = require("zod");
// Name validation schema (for first and last name)
const nameSchema = zod_1.z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be no more than 30 characters")
    .regex(/^[A-Za-z\s\-]+$/, "Name can only contain letters, spaces, and hyphens");
// Date validation helper
const dateStringSchema = zod_1.z
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
exports.ORIGINAL_150_POKEMON = [
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
];
// Pokemon enum type
exports.pokemonEnum = zod_1.z.enum(exports.ORIGINAL_150_POKEMON);
// Main form schema
exports.pokemonSubmissionSchema = zod_1.z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    dateOfBirth: dateStringSchema,
    favouritePokemon: exports.pokemonEnum,
    whyFavourite: zod_1.z
        .string()
        .min(1, "Please tell us why this Pokémon is your favourite"),
});
//# sourceMappingURL=pokemon.js.map