export const MapLibraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

export const MapHelper = {
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
};

const marketSize = 30;

export const MarkerHelper = {
  getIcon: (index: number) =>
    "http://maps.google.com/mapfiles/kml/paddle/" + getLetter(index) + ".png",
  getSize: () => new window.google.maps.Size(marketSize, marketSize),
  getOrigin: () => new window.google.maps.Point(0, 0),
  getAnchor: () => new window.google.maps.Point(marketSize / 2, marketSize / 2),
};

export const getLetter = (index: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(index);
};
