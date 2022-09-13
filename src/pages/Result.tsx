import { Card } from "react-bootstrap";

const Result = () => {
  return (
    <section>
      <h2 className="text-center">Results</h2>
      <Card>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <p>Result</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Result;
