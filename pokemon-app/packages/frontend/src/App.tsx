import React from 'react';
import { PokemonForm } from './components/PokemonForm';
import { SuccessMessage } from './components/SuccessMessage';
import { usePokemon } from './hooks/usePokemon';
import './styles/globals.css';

function App() {
  const { 
    isLoading, 
    isSubmitted, 
    submissionData, 
    error, 
    submitForm, 
    resetForm 
  } = usePokemon();

  return (
    <div className="min-h-screen pokeball-bg py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <span className="text-6xl animate-wiggle">⚡</span>
            <h1 className="pokemon-title text-5xl md:text-6xl text-white">
              Pokémon Central
            </h1>
            <span className="text-6xl animate-wiggle" style={{ animationDelay: '1s' }}>🔥</span>
          </div>
          <p className="text-white/90 text-xl font-semibold">
            Gotta Catch 'Em All! Register as a Pokémon Trainer today! 🌟
          </p>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 text-4xl opacity-20 animate-bounce">🌟</div>
          <div className="absolute -top-2 -right-8 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>⚡</div>
          <div className="absolute top-1/2 -left-8 text-5xl opacity-10 animate-pulse">🎮</div>
          <div className="absolute top-1/3 -right-6 text-4xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>🏆</div>

          {/* Form or Success Message */}
          {isSubmitted && submissionData ? (
            <SuccessMessage
              pokemonName={submissionData.favouritePokemon}
              onReset={resetForm}
            />
          ) : (
            <PokemonForm
              onSubmit={submitForm}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-6 text-3xl mb-4">
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🔴</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🟡</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🔵</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🟢</span>
          </div>
          <p className="text-white/70 font-medium">
            Made with ❤️ for Pokémon Trainers everywhere
          </p>
          <p className="text-white/50 text-sm mt-2">
            © 2025 Pokémon Central - Become the very best, like no one ever was!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;