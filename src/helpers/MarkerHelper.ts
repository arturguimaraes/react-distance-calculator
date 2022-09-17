import TextHelper from "./TextHelper";

const MarkerHelper = {
  markerSize: 30,
  getIcon: (index: number) =>
    "http://maps.google.com/mapfiles/kml/paddle/" +
    TextHelper.getLetter(index) +
    ".png",
  getSize: () =>
    new window.google.maps.Size(
      MarkerHelper.markerSize,
      MarkerHelper.markerSize
    ),
  getOrigin: () => new window.google.maps.Point(0, 0),
  getAnchor: () =>
    new window.google.maps.Point(
      MarkerHelper.markerSize / 2,
      MarkerHelper.markerSize / 2
    ),
};

export default MarkerHelper;
