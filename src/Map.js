import React from "react";
//import { GeoJsonObject } from 'geojson';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import boundaries from "./data/Albania_boundaries.json"
import disaster from "./data/disaster_count_albania.json"

export default function Map() {

    const MapTileUrls = {
        osm: {name: "%copyOpenStreetMap", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"},
        google_road: {name: "&copyGoogle; data by UNDP", url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"},
        google_hybrid: {name: "&copyGoogle", url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"},
        google_satellite: {name: "&copyGoogle", url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"},
        mapbox: {name: "&copyMapbox; OpenStreetMap; data by UNDP", url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"},
    };

    const position = [41.1533, 20.1683]

    return(
        <div className="map" id="map">
            <MapContainer center={position} zoom={7.5} scrollWheelZoom={true}>
                <TileLayer attribution={MapTileUrls.mapbox.name} 
                    url={MapTileUrls.mapbox.url}/>
                <GeoJSON key="geojson-1" data={boundaries} style={() => ({
                color: '#4a83ec',
                weight: 0.1,
                fillColor: "#1a1d62",
                fillOpacity: 0.09,
                })}
                />
                <GeoJSON key="geojson-2" data={disaster} style={() => ({
                color: '#4e544b',
                weight: 0.95,
                fillColor: "#79b340",
                fillOpacity: 0.7,
                })}
                />
            </MapContainer>
        </div>
    );
}

// export function plotGeoJson(data, idx) {
//     return <GeoJSON key={`geojson-${idx}`} data={data} />
// }