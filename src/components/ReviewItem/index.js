import { useSelector } from "react-redux";
import "./ReviewItem.scss";
import { useState, useEffect } from "react";
import { Button, Image, notification } from "antd";
import { formatLocalDateTime, getDate } from "../../utils/format";
import { deleteReview } from "../../service/RoomService/ReviewService";
import { getInfoUserById } from "../../service/UserService/AuthService";
function ReviewItem({ item, onDeleteReview }) {
  const user = useSelector((state) => state.user);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [userReview, setUserReview] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getInfoUserById(item.userId);
        console.log(res);
        if (res.code == 200) {
          setUserReview(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  const openNotification = (placement, message, color, onClose) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
      duration: 5,
    });
  };
  const handlePreview = (image) => {
    setPreviewImage(image);
    setPreviewOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteReview(id);
      if (res.code == 200) {
        openNotification("topRight", "Xóa thành công!", "green");
        onDeleteReview(Date.now());
      } else {
        openNotification("topRight", "Xóa thất bại!", "red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Xóa thất bại!", "red");
    }
  };
  return (
    <>
      {contextHolder}
      <div className="review_item">
        {/* Header - Avatar và tên user */}
        <div className="review_item__header">
          <img src={userReview?.avatar} alt="Avatar" />
          <p>
            {userReview?.firstName} {userReview?.lastName}
          </p>
          <p className="date">{getDate(item.createdAt)}</p>
        </div>

        {/* Nội dung đánh giá */}
        <div className="review_item__content">
          <p>{item.content}</p>

          {/* Hiển thị các ảnh nhỏ */}
          <div className="review_item__images">
            {item.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                onClick={() => handlePreview(img)}
              />
            ))}
          </div>

          {/* Hiển thị preview ảnh khi được click */}
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => {
                  if (!visible) setPreviewImage("");
                },
              }}
              src={previewImage}
            />
          )}
        </div>
        {item.userId == user.id && (
          <p className="delete" onClick={() => handleDelete(item.id)}>
            Xoá đánh giá
          </p>
        )}
      </div>
    </>
  );
}
export default ReviewItem;
