import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
      <h2 className="text-center">Page Not Found</h2>
      <Card>
        <Card.Header>Page Not Found</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">
                To go back, click <Link to="/home">here</Link>.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default NotFound;
