"use client";

import { useEffect } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";

const courierIcon = divIcon({
  className: "",
  html: '<span aria-hidden="true" style="display:grid;width:36px;height:36px;place-items:center;border:3px solid white;border-radius:50%;background:#2563eb;box-shadow:0 2px 8px #0006;color:white;font-size:13px;font-weight:800">C</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const deliveryIcon = divIcon({
  className: "",
  html: '<span aria-hidden="true" style="display:grid;width:36px;height:36px;place-items:center;border:3px solid white;border-radius:50%;background:#b45309;box-shadow:0 2px 8px #0006;color:white;font-size:13px;font-weight:800">D</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

function FitLocations({ locations }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(locations, { padding: [36, 36] });
  }, [locations, map]);

  return null;
}

export default function DeliveryMap({ courier, destination, deliveryAddress }) {
  const locations = [courier, destination];

  return (
    <MapContainer
      center={destination}
      className="h-[360px] w-full rounded-xl"
      scrollWheelZoom={false}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitLocations locations={locations} />
      <Marker
        alt="Courier, approximate location"
        icon={courierIcon}
        keyboard
        position={courier}
        title="Courier, approximate location"
      >
        <Tooltip permanent>Courier · approximate</Tooltip>
        <Popup>Courier location is approximate, not live GPS.</Popup>
      </Marker>
      <Marker
        alt="Delivery address area, approximate neighbourhood location"
        icon={deliveryIcon}
        keyboard
        position={destination}
        title="Delivery address area, approximate neighbourhood location"
      >
        <Tooltip permanent>Delivery area</Tooltip>
        <Popup>
          <strong>Delivery address</strong>
          <br />
          {deliveryAddress}
          <br />
          <small>Map pin indicates the approximate neighbourhood, not the exact address.</small>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
