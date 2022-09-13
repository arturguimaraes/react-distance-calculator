import { Card } from "react-bootstrap";
import MapWrapper from "../components/map/MapWrapper";

const Form = () => {
  return (
    <section>
      <h2 className="text-center">Choose your addresses</h2>
      <Card>
        <Card.Header>Pick your addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <Card.Text>
                1. First, you have to pick at least 3 addresses.
              </Card.Text>
            </div>
            <div className="col-md-6">
              <MapWrapper />
            </div>
            <div className="col-md-6">List</div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Form;
