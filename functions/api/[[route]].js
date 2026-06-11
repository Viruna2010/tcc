const DISTRICTS = [
  { id: 'colombo', name: 'Colombo', nameSi: 'කොළඹ', province: 'බස්නාහිර' },
  { id: 'gampaha', name: 'Gampaha', nameSi: 'ගම්පහ', province: 'බස්නාහිර' },
  { id: 'kalutara', name: 'Kalutara', nameSi: 'කළුතර', province: 'බස්නාහිර' },
  { id: 'kandy', name: 'Kandy', nameSi: 'මහනුවර', province: 'මධ්‍යම' },
  { id: 'matale', name: 'Matale', nameSi: 'මාතලේ', province: 'මධ්‍යම' },
  { id: 'nuwara_eliya', name: 'Nuwara Eliya', nameSi: 'නුවරඑළිය', province: 'මධ්‍යම' },
  { id: 'galle', name: 'Galle', nameSi: 'ගාල්ල', province: 'දකුණු' },
  { id: 'matara', name: 'Matara', nameSi: 'මාතර', province: 'දකුණු' },
  { id: 'hambantota', name: 'Hambantota', nameSi: 'හම්බන්තොට', province: 'දකුණු' },
  { id: 'jaffna', name: 'Jaffna', nameSi: 'යාපනය', province: 'උතුරු' },
  { id: 'kilinochchi', name: 'Kilinochchi', nameSi: 'කිලිනොච්චිය', province: 'උතුරු' },
  { id: 'mannar', name: 'Mannar', nameSi: 'මන්නාරම', province: 'උතුරු' },
  { id: 'vavuniya', name: 'Vavuniya', nameSi: 'වව්නියාව', province: 'උතුරු' },
  { id: 'mullaitivu', name: 'Mullaitivu', nameSi: 'මුලතිව්', province: 'උතුරු' },
  { id: 'batticaloa', name: 'Batticaloa', nameSi: 'මඩකලපුව', province: 'නැගෙනහිර' },
  { id: 'ampara', name: 'Ampara', nameSi: 'අම්පාර', province: 'නැගෙනහිර' },
  { id: 'trincomalee', name: 'Trincomalee', nameSi: 'ත්‍රිකුණාමලය', province: 'නැගෙනහිර' },
  { id: 'kurunegala', name: 'Kurunegala', nameSi: 'කුරුණෑගල', province: 'වයඹ' },
  { id: 'puttalam', name: 'Puttalam', nameSi: 'පුත්තලම', province: 'වයඹ' },
  { id: 'anuradhapura', name: 'Anuradhapura', nameSi: 'අනුරාධපුර', province: 'උ.මැද' },
  { id: 'polonnaruwa', name: 'Polonnaruwa', nameSi: 'පොළොන්නරුව', province: 'උ.මැද' },
  { id: 'badulla', name: 'Badulla', nameSi: 'බදුල්ල', province: 'ඌව' },
  { id: 'monaragala', name: 'Monaragala', nameSi: 'මොනරාගල', province: 'ඌව' },
  { id: 'ratnapura', name: 'Ratnapura', nameSi: 'රත්නපුර', province: 'සබරගමු' },
  { id: 'kegalle', name: 'Kegalle', nameSi: 'කෑගල්ල', province: 'සබරගමු' }
];

export async function onRequest({ request }) {
  const data = DISTRICTS.map(d => ({
    district: d.id,
    districtSi: d.nameSi,
    province: d.province,
    temp: Math.floor(26 + Math.random() * 6),
    feelsLike: Math.floor(28 + Math.random() * 6),
    humidity: Math.floor(65 + Math.random() * 15),
    windSpeed: (Math.random() * 5).toFixed(1),
    windDeg: Math.floor(Math.random() * 360),
    pressure: 1010 + Math.floor(Math.random() * 15),
    visibility: 8 + Math.floor(Math.random() * 3),
    uvIndex: Math.floor(Math.random() * 11),
    uvLevel: { label: 'මධ්‍යම', color: '#FFC107' },
    condition: 'Clear',
    conditionSi: 'පැහැදිලියි',
    sunrise: '05:55',
    sunset: '18:25',
    updatedAt: new Date().toISOString(),
    isMock: true
  }));

  return new Response(JSON.stringify({ success: true, timestamp: new Date().toISOString(), data }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
