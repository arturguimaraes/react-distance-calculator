import { Fragment } from "react";

interface Props {
  mapPage: boolean;
}

const Header = (props: Props) => {
  return (
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th>Address</th>
        {!props.mapPage && (
          <Fragment>
            <th>Latitude</th>
            <th>Longitude</th>
          </Fragment>
        )}
        {props.mapPage && <th className="text-center">View</th>}
        <th className="text-center">Remove</th>
      </tr>
    </thead>
  );
};

export default Header;
