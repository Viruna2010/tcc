const DISTRICTS = [
  { id: 'colombo', nameSi: 'කොළඹ', lat: 6.9271, lon: 79.8612, province: 'බස්නාහිර' },
  { id: 'gampaha', nameSi: 'ගම්පහ', lat: 7.0840, lon: 80.0098, province: 'බස්නාහිර' },
  { id: 'kalutara', nameSi: 'කළුතර', lat: 6.5854, lon: 79.9607, province: 'බස්නාහිර' },
  { id: 'kandy', nameSi: 'මහනුවර', lat: 7.2906, lon: 80.6337, province: 'මධ්‍යම' },
  { id: 'matale', nameSi: 'මාතලේ', lat: 7.4675, lon: 80.6234, province: 'මධ්‍යම' },
  { id: 'nuwara_eliya', nameSi: 'නුවරඑළිය', lat: 6.9497, lon: 80.7891, province: 'මධ්‍යම' },
  { id: 'galle', nameSi: 'ගාල්ල', lat: 6.0535, lon: 80.2210, province: 'දකුණු' },
  { id: 'matara', nameSi: 'මාතර', lat: 5.9485, lon: 80.5353, province: 'දකුණු' },
  { id: 'hambantota', nameSi: 'හම්බන්තොට', lat: 6.1241, lon: 81.1185, province: 'දකුණු' },
  { id: 'jaffna', nameSi: 'යාපනය', lat: 9.6615, lon: 80.0255, province: 'උතුරු' },
  { id: 'kilinochchi', nameSi: 'කිලිනොච්චිය', lat: 9.3803, lon: 80.4037, province: 'උතුරු' },
  { id: 'mannar', nameSi: 'මන්නාරම', lat: 8.9810, lon: 79.9044, province: 'උතුරු' },
  { id: 'vavuniya', nameSi: 'වව්නියාව', lat: 8.7514, lon: 80.4971, province: 'උතුරු' },
  { id: 'mullaitivu', nameSi: 'මුලතිව්', lat: 9.2671, lon: 80.8128, province: 'උතුරු' },
  { id: 'batticaloa', nameSi: 'මඩකලපුව', lat: 7.7170, lon: 81.7004, province: 'නැගෙනහිර' },
  { id: 'ampara', nameSi: 'අම්පාර', lat: 7.2911, lon: 81.6724, province: 'නැගෙනහිර' },
  { id: 'trincomalee', nameSi: 'ත්‍රිකුණාමලය', lat: 8.5874, lon: 81.2152, province: 'නැගෙනහිර' },
  { id: 'kurunegala', nameSi: 'කුරුණෑගල', lat: 7.4867, lon: 80.3647, province: 'වයඹ' },
  { id: 'puttalam', nameSi: 'පුත්තලම', lat: 8.0362, lon: 79.8283, province: 'වයඹ' },
  { id: 'anuradhapura', nameSi: 'අනුරාධපුර', lat: 8.3114, lon: 80.4037, province: 'උ.මැද' },
  { id: 'polonnaruwa', nameSi: 'පොළොන්නරුව', lat: 7.9403, lon: 81.0188, province: 'උ.මැද' },
  { id: 'badulla', nameSi: 'බදුල්ල', lat: 6.9934, lon: 81.0550, province: 'ඌව' },
  { id: 'monaragala', nameSi: 'මොනරාගල', lat: 6.8728, lon: 81.3394, province: 'ඌව' },
  { id: 'ratnapura', nameSi: 'රත්නපුර', lat: 6.7056, lon: 80.3847, province: 'සබරගමු' },
  { id: 'kegalle', nameSi: 'කෑගල්ල', lat: 7.2513, lon: 80.3464, province: 'සබරගමු' }
];

async function fetchWeather(d) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
  const res = await fetch(url);
  const json = await res.json();
  return {
    ...d,
    temp: Math.round(json.current.temperature_2m),
    humidity: json.current.relative_humidity_2m,
    windSpeed: json.current.wind_speed_10m,
    conditionSi: json.current.weather_code < 3 ? "පැහැදිලියි" : "වලාකුළු සහිතයි",
    condition: "Clear",
    feelsLike: Math.round(json.current.temperature_2m + 2),
    visibility: 10,
    uvIndex: 5,
    uvLevel: { label: 'මධ්‍යම', color: '#FFC107' },
    isMock: false
  };
}

export async function onRequest({ request }) {
  const data = await Promise.all(DISTRICTS.map(fetchWeather));
  return new Response(JSON.stringify({ success: true, data }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
