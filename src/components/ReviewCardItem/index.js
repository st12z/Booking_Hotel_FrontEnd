import { useSelector } from "react-redux";
import { getDate } from "../../utils/format";
import "./ReviewCardItem.scss"
function ReviewCardItem({ item }) {
  const user=useSelector(state=>state.user);
  return (
    <>
      <div className="reviewcard_item">
        <div className="reviewcard_item__header">
          <img src={user.avatar} alt="Avatar" />
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p className="date">{getDate(item.createdAt)}</p>
        </div>
        <div className="reviewcard_item__content">
          <p>{item.content}</p>
        </div>
      </div>
    </>
  );
}
export default ReviewCardItem;
