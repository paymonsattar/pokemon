import React from 'react';
import { ORIGINAL_150_POKEMON } from '../data/pokemon';

interface PokemonDropdownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const PokemonDropdown: React.FC<PokemonDropdownProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold text-gray-700">
          🌟 Favourite Pokémon
        </span>
      </label>
      <select
        className={`select select-bordered w-full bg-white ${
          error ? 'select-error' : 'focus:border-yellow-400'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Choose your favourite Pokémon!
        </option>
        {ORIGINAL_150_POKEMON.map((pokemon) => (
          <option key={pokemon} value={pokemon}>
            {pokemon}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};