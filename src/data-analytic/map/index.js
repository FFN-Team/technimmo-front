import "./styles.css"
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"

const map = L.map("map").setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var customIcon = L.icon({
    iconUrl: "map_location_icon.png"
})

var marker = L.marker([51.505, -0.09], {
    icon: customIcon
}).addTo(map)