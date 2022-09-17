import React from "react";
import IAddress from "../../types/IAddress";
import { useAppSelector } from "../../store/hooks";
import Address from "./Address";

interface Props {
  mapPage: boolean;
}

const Addresses = (props: Props) => {
  //GET ADDRESS STATE
  const addressState = useAppSelector((state) => state.address);

  return (
    <React.Fragment>
      {addressState.addresses.map((address: IAddress, index: number) => (
        <Address
          key={address.id}
          index={index}
          address={address}
          mapPage={props.mapPage}
        />
      ))}
    </React.Fragment>
  );
};

export default Addresses;
