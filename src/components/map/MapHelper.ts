export const MapLibraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const MapHelper = {
  mapContainerStyle: {
    width: "100%",
    height: "400px",
  },
  options: {
    disableDefaultUI: true,
    zoomControl: true,
  },
  center: { lat: -22.96004843363514, lng: -43.16931908407526 },
  initialMapZoomLevel: 10,
};

export default MapHelper;