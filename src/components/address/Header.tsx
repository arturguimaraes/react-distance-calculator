interface Props {
  mapShown: boolean;
}

const Header = (props: Props) => {
  return (
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th>Address</th>
        {!props.mapShown && (
          <>
            <th>Latitude</th>
            <th>Longitude</th>
          </>
        )}
        <th className="text-center">Remove</th>
      </tr>
    </thead>
  );
};

export default Header;
