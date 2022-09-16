import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <tr>
      <td colSpan={4} className="text-center">
        You don't have any addresse choosen. Please click{" "}
        <Link to="/form">here</Link> to choose at least 3.
      </td>
    </tr>
  );
};

export default Empty;
