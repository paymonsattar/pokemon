import React from 'react';

interface SuccessMessageProps {
  pokemonName: string;
  onReset: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  pokemonName,
  onReset,
}) => {
  return (
    <div className="animate-bounce-in">
      <div className="pokemon-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4 animate-wiggle">🎉</div>
        
        <h2 className="pokemon-title text-3xl text-purple-600 mb-4">
          Awesome Choice!
        </h2>
        
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 mb-6">
          <p className="text-xl font-bold text-gray-800">
            Thanks for submitting!
          </p>
          <p className="text-lg text-gray-700 mt-2">
            I like <span className="text-purple-600 font-bold">{pokemonName}</span> too! 🌟
          </p>
        </div>

        <div className="flex justify-center space-x-4 text-4xl mb-6">
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⚡</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🔥</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💧</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌿</span>
        </div>

        <button
          onClick={onReset}
          className="pokemon-button btn border-none px-6 py-3 rounded-full text-lg"
        >
          Submit Another! 🎮
        </button>
      </div>
    </div>
  );
};