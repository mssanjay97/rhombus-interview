import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function App() {
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/weapons')
      .then(response => setWeapons(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Weapons Position Dashboard</h1>
      <MapContainer center={[37.42, -122.12]} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {weapons.map((wp, idx) => (
          <Marker key={idx} position={[wp.latitude, wp.longitude]} icon={defaultIcon}>
            <Popup>{wp.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;