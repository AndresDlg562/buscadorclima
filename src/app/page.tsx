'use client';
import { useState } from "react";
import Card from "@/components/Card";

interface WeatherData {
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
}

export default function Home() {
  const [searchCity, setSearchCity] = useState("");
  const [weatherCards, setWeatherCards] = useState<WeatherData[]>([]);
  const [error, setError] = useState("");
  const apiKey = "";

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchCity}&aqi=no`
      );
      
      if (!response.ok) {
        alert("Ciudad no encontrada");
        return;
      }

      const data = await response.json();
      
      if (data.location.name.toLowerCase() !== searchCity.toLowerCase()) {
        const confirmed = window.confirm(
          `¿Querías buscar ${data.location.name}, ${data.location.country}?`
        );
        if (!confirmed) {
          return;
        }
      }

      setWeatherCards(prev => [...prev, data]);
      setSearchCity("");
      setError("");
    } catch (err) {
      alert("Error al buscar la ciudad");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center w-full py-10">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Busca una ciudad"
          className="border rounded p-2 w-4/5 max-w-md"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {weatherCards.map((data, index) => (
          <Card key={`${data.location.name}-${index}`} weatherData={data} />
        ))}
      </div>
    </div>
  );
}
