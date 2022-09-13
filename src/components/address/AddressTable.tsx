import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeAddress } from "../../store/addressSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import IAddress from "../../types/IAddress";

const AddressTable = () => {
  const dispatch = useAppDispatch();
  const addressState = useAppSelector((state) => state.address);
  const addresses = addressState.addresses;
  const hasAddresses = addressState.count > 0;

  const deleteAddressHandler = (id: string) => {
    dispatch(removeAddress(id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th className="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        {!hasAddresses && (
          <tr>
            <td colSpan={4} className="text-center">
              You don't have any addresse choosen. Please click{" "}
              <Link to="/form">here</Link> to choose at least 3.
            </td>
          </tr>
        )}
        {addresses.map((address: IAddress, index: number) => (
          <tr key={address.id}>
            <td>{index + 1}</td>
            <td>{address.id}</td>
            <td>{address.lat}</td>
            <td>{address.lng}</td>
            <td className="text-center">
              <Button
                variant="outline-danger"
                onClick={deleteAddressHandler.bind(null, address.id)}
              >
                x
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AddressTable;
