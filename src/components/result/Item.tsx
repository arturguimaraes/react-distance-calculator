import IDistance from "../../types/IDistance";
import classes from "./Item.module.scss";

interface Props {
  distance: IDistance;
  index: number;
  lastIndex: number;
}

const Item = (props: Props) => {
  let rowClass = "";
  if (props.index === 0) rowClass = classes.green;
  if (props.index === props.lastIndex) rowClass = classes.red;
  return (
    <tr className={rowClass}>
      <td className="text-center">{props.index + 1}</td>
      <td>{props.distance.origin.address}</td>
      <td>{props.distance.destination.address}</td>
      <td>{`${props.distance.distance.toFixed(2)} Km`}</td>
    </tr>
  );
};

export default Item;
