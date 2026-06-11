const DISTRICTS = [
  { id: 'colombo', name: 'කොළඹ', lat: 6.9271, lon: 79.8612 },
  { id: 'kandy', name: 'මහනුවර', lat: 7.2906, lon: 80.6337 },
  { id: 'galle', name: 'ගාල්ල', lat: 6.0535, lon: 80.2210 },
  // අනිත් දිස්ත්‍රික්කත් මේ විදියට එකතු කරගන්න
];

async function getWeatherData(d) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current=temperature_2m,weather_code`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    district: d.name,
    temp: data.current.temperature_2m + "°C",
    condition: data.current.weather_code < 10 ? "පැහැදිලියි" : "වැසි/වලාකුළු",
    isMock: false
  };
}

export async function onRequest({ request }) {
  const url = new URL(request.url);
  if (url.pathname === '/api/weather/all') {
    const data = await Promise.all(DISTRICTS.map(getWeatherData));
    return new Response(JSON.stringify(data), { 
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } 
    });
  }
  return new Response("Not Found", { status: 404 });
}
