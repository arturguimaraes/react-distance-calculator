import { Marker } from "@react-google-maps/api";
import { useAppSelector } from "../../store/hooks";
import { v4 as uuidV4 } from "uuid";
import MarkerHelper from "../../helpers/MarkerHelper";
import { Fragment } from "react";

const Markers = () => {
  //LOAD ADDRESS STATE
  const addressesState = useAppSelector((state) => state.address);

  return (
    <Fragment>
      {addressesState.addresses.map((address, index) => {
        return (
          <Marker
            key={uuidV4()}
            title={address.address}
            position={{ lat: address.lat, lng: address.lng }}
            icon={{
              url: MarkerHelper.getIcon(index),
              scaledSize: MarkerHelper.getSize(),
              origin: MarkerHelper.getOrigin(),
              anchor: MarkerHelper.getAnchor(),
            }}
          />
        );
      })}
    </Fragment>
  );
};

export default Markers;
