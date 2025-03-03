import { useState, useEffect } from 'react';

interface CardProps {
  weatherData: {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
      humidity: number;
      wind_kph: number;
    };
  };
  onRemove: () => void;
}

const Card = ({ weatherData, onRemove }: CardProps) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md w-[300px] m-5">
      <button
       onClick={onRemove}
       className="text-red-500 p-2 rounded-md float-right"
       >
        X
       </button>
      <h2 className="text-xl font-semibold mb-4">{weatherData.location.name}, {weatherData.location.country}</h2>
      <div>
        <img 
          src={weatherData.current.condition.icon} 
          alt={weatherData.current.condition.text}
          className="mb-3"
        />
        <p className="mb-2">Temperature: {weatherData.current.temp_c}°C</p>
        <p className="mb-2">Condition: {weatherData.current.condition.text}</p>
        <p className="mb-2">Humidity: {weatherData.current.humidity}%</p>
        <p className="mb-2">Wind: {weatherData.current.wind_kph} km/h</p>
      </div>
    </div>
  );
};

export default Card;
