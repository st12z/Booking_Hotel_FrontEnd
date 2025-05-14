import { Button, Col, Modal, Row } from "antd";
import ReviewItem from "../ReviewItem";
import { useState } from "react";

function ListReviews({ reviews,onDeleteReview }) {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(showMore);
  return (
    <>
      {reviews.length > 0 && (
        <>
          <h2>Các lượt đánh giá</h2>
          <div className="list_item" style={{ marginBottom: "10px" }}>
            <Row gutter={[10, 10]}>
              {reviews.length <= 3 ? (
                <>
                  {reviews.map((item, index) => (
                    <Col span={8}>
                      <ReviewItem item={item} key={index} onDeleteReview={onDeleteReview}/>
                    </Col>
                  ))}
                </>
              ) : (
                <>
                  {showMore && (
                    <>
                      <Modal
                        open={showMore}
                        onCancel={() => setShowMore(false)}
                        closable={{ "aria-label": "Custom Close Button" }}
                        style={{ padding: "10px" }}
                        footer={null}
                      >
                        <Row gutter={[10, 10]}>
                          {reviews.map((item, index) => (
                            <Col span={24} key={index}>
                              <ReviewItem item={item} onDeleteReview={onDeleteReview}/>
                            </Col>
                          ))}
                        </Row>
                      </Modal>
                    </>
                  )}
                  <>
                    {reviews.slice(0, 3).map((item, index) => (
                      <Col span={8} key={index}>
                        <ReviewItem item={item} onDeleteReview={onDeleteReview}/>
                      </Col>
                    ))}
                    <Button type="primary" onClick={() => setShowMore(true)}>
                      Xem thêm...
                    </Button>
                  </>
                </>
              )}
            </Row>
          </div>
        </>
      )}
    </>
  );
}
export default ListReviews;
