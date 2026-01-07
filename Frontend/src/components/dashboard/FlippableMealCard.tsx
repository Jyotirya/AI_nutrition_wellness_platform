import { useState } from 'react';

interface FlippableMealCardProps {
  type: string;
  name: string;
  ingredients: string[];
  calories: number;
  time: string;
}

export function FlippableMealCard({ type, name, ingredients, calories, time }: FlippableMealCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-80 md:h-96 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-gpu`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#85C872] transition shadow-sm"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white bg-[#85C872] px-4 py-2 rounded-full">
                {type}
              </span>
              <span className="text-sm text-gray-500">{time}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl mb-6 text-gray-800">{name}</h3>
            
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-3">Ingredients:</p>
              <ul className="space-y-2.5">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-base md:text-lg text-gray-600 flex items-start gap-3">
                    <span className="text-[#85C872] mt-1 text-xl">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-gray-400 mt-6 text-center">Click to view calories</p>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-2xl p-8 border-2 border-[#85C872] shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white">
            <div className="text-sm md:text-base mb-3 opacity-90">{type}</div>
            <h3 className="text-2xl md:text-3xl mb-8">{name}</h3>
            
            <div className="mb-8">
              <div className="text-7xl md:text-8xl mb-3">{calories}</div>
              <div className="text-2xl md:text-3xl opacity-90">calories</div>
            </div>
            
            <div className="text-base md:text-lg opacity-75">{time}</div>
            
            <p className="text-sm mt-8 opacity-75">Click to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
}