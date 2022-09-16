import React from "react";
import IAddress from "../../types/IAddress";
import { useAppSelector } from "../../store/hooks";
import Address from "./Address";

interface Props {
  mapShown: boolean;
}

const Addresses = (props: Props) => {
  const addresses = useAppSelector((state) => state.address.addresses);

  return (
    <React.Fragment>
      {addresses.map((address: IAddress, index: number) => (
        <Address
          key={address.id}
          index={index}
          address={address}
          mapShown={props.mapShown}
        />
      ))}
    </React.Fragment>
  );
};

export default Addresses;
