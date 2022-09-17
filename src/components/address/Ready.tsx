import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  count: number;
}

const Ready = (props: Props) => {
  return (
    <Alert variant="success" className="text-center">
      You have chosen {props.count} addresses. Click{" "}
      <Link to="/result">here</Link> to see results.
    </Alert>
  );
};

export default Ready;
