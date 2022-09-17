import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  count: number;
}

const Empty = (props: Props) => {
  return (
    <Alert variant="warning" className="text-center">
      You have chosen {props.count} address(es). Click{" "}
      <Link to="/form">here</Link> to choose at least 3.
    </Alert>
  );
};

export default Empty;
