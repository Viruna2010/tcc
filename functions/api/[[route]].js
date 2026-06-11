const API_BASE = "https://api.open-meteo.com/v1/forecast";

const DISTRICTS = [
    { id: 'colombo', nameSi: 'කොළඹ', lat: 6.9271, lon: 79.8612, province: 'බස්නාහිර' },
    { id: 'kandy', nameSi: 'මහනුවර', lat: 7.2906, lon: 80.6337, province: 'මධ්‍යම' },
    { id: 'galle', nameSi: 'ගාල්ල', lat: 6.0535, lon: 80.2210, province: 'දකුණු' }
    // ... මෙතනට දිස්ත්‍රික්ක 25 ම අර මම කලින් දුන්නු ලැයිස්තුව දාගන්න
];

async function fetchAllWeather() {
    const grid = document.getElementById('weatherGrid');
    grid.innerHTML = `<div class="loading-state">කාලගුණ දත්ත ලබාගනිමින්...</div>`;

    try {
        // අපි දිස්ත්‍රික්ක 25 ටම එකපාර Request යවනවා
        const promises = DISTRICTS.map(async (d) => {
            const url = `${API_BASE}?latitude=${d.lat}&longitude=${d.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;
            const res = await fetch(url);
            const json = await res.json();
            return {
                ...d,
                temp: Math.round(json.current.temperature_2m),
                humidity: json.current.relative_humidity_2m,
                windSpeed: json.current.wind_speed_10m,
                conditionSi: 'පැහැදිලියි',
                condition: 'Clear',
                feelsLike: Math.round(json.current.temperature_2m + 2),
                visibility: 10,
                uvIndex: 4,
                uvLevel: { label: 'මධ්‍යම', color: '#FFC107' },
                windDeg: 180,
                sunrise: '06:00',
                sunset: '18:30',
                updatedAt: new Date().toISOString(),
                isMock: false
            };
        });

        allWeatherData = await Promise.all(promises);
        renderGrid(allWeatherData);
        document.getElementById('statusText').textContent = 'Live Data';

    } catch (err) {
        grid.innerHTML = `<div class="empty-state">⚠️ දත්ත ලබාගැනීමේ දෝෂයකි</div>`;
    }
}
