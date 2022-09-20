import IAddress from "../types/IAddress";
import MapLibraries from "../types/MapLibraries";

const MapHelper = {
  //Properties
  mapContainerStyle: {
    width: "100%",
    height: "400px",
  },
  options: {
    disableDefaultUI: true,
    zoomControl: true,
  },
  center: { lat: -22.96004843363514, lng: -43.16931908407526 },
  initialMapZoomLevel: 14,
  onChooseZoomLevel: 16,
  libraries: ["places"] as MapLibraries,
  alertShowSeconds: 5,
  //Functions
  getCenter: (address: IAddress) => {
    return { lat: address.lat, lng: address.lng };
  },
  mapPanTo: (map: google.maps.Map, lat: number, lng: number) => {
    if (map) {
      //Set center
      map.panTo({ lat: lat, lng: lng });
      //Set zoom
      map.setZoom(MapHelper.onChooseZoomLevel);
    }
  },
  mapPanToCenter: (
    map: google.maps.Map,
    center: { lat: number; lng: number }
  ) => {
    MapHelper.mapPanTo(map, center.lat, center.lng);
  },
  mapPanToAddress: (map: google.maps.Map, address: IAddress) => {
    MapHelper.mapPanTo(map, address.lat, address.lng);
  },
};

export default MapHelper;
