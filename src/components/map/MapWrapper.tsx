import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";
import IAddress from "../../types/IAddress";
import Map from "./Map";

const MapWrapper = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);
  const addAddressHandler = (address: IAddress) =>
    dispatch(addAddress(address));

  return <Map addresses={addresses} onAddAddress={addAddressHandler} />;
};

export default MapWrapper;
