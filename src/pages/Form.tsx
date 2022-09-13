import { Card } from "react-bootstrap";
import MapWrapper from "../components/map/MapWrapper";
import AddressTable from "../components/address/AddressTable";

const Form = () => {
  return (
    <section>
      <h2 className="text-center">Choose your addresses</h2>
      <Card>
        <Card.Header>Pick your addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <p>
                Use the search box or browse in the map, then click your
                location to save it.
              </p>
            </div>
            <div className="col-md-6">
              <MapWrapper />
            </div>
            <div className="col-md-6">
              <AddressTable />
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Form;
