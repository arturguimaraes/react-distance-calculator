import { Fragment } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  count: number;
  mapPage?: boolean;
}

const Empty = (props: Props) => {
  return (
    <Alert variant="warning" className="text-center">
      <span>You have chosen {props.count} address(es). </span>
      {props.mapPage ? (
        "Please choose at least 3 to see results."
      ) : (
        <Fragment>
          Click <Link to="/form#searchBox">here</Link> to choose at least 3 to
          see results.
        </Fragment>
      )}
    </Alert>
  );
};

export default Empty;
