const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = { lat: -22.96004843363514, lng: -43.16931908407526 };

const initialMapZoomLevel = 10;

const MapHelper = {
  libraries,
  mapContainerStyle,
  options,
  center,
  initialMapZoomLevel,
};

export default MapHelper;
