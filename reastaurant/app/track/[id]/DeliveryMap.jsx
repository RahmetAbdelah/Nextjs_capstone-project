"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";

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
      <CircleMarker center={courier} pathOptions={{ color: "#1d4ed8", fillColor: "#3b82f6", fillOpacity: 1 }} radius={9}>
        <Tooltip permanent>Courier</Tooltip>
      </CircleMarker>
      <CircleMarker center={destination} pathOptions={{ color: "#9a3412", fillColor: "#f97316", fillOpacity: 1 }} radius={9}>
        <Tooltip permanent>Delivery address</Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
