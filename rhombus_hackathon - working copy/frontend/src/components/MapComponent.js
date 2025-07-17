import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon paths (issue with Webpack and React-Leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ weapons }) => {
  const defaultCenter = [37.7749, -122.4194]; // Centered on San Francisco as a general example
  const defaultZoom = 10;

  return (
    <div className="map-container">
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: 'calc(100vh - 180px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {weapons.map(weapon => (
          <Marker key={weapon.id} position={[weapon.latitude, weapon.longitude]}>
            <Popup>
              <strong>Type:</strong> {weapon.type}<br />
              <strong>Status:</strong> {weapon.status}<br />
              <strong>Last Reported:</strong> {new Date(weapon.last_reported_at).toLocaleString()}<br />
              <strong>Risk Score:</strong> {weapon.risk_score}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;