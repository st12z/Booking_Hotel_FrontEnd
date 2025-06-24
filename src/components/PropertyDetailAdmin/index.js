import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPropertyId } from "../../service/RoomService/PropertyService";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import TextArea from "antd/es/input/TextArea";
function PropertyDetailAdmin() {
  const params = useParams();
  const propertyId = params.id;
  const [property, setProperty] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getPropertyId(propertyId);
        console.log(res);
        if (res.code == 200) {
          const property=res.data;
          property.facilities=property.facilities.map(item=>{
            return {
              value: item,
              label: item
            }
          })
          property.rooms = property.rooms.map(item=>{
            return{
              value:item.roomNumber,
              label: item.roomNumber
            }
          });
          property.roomTypes = property.roomTypes.map(item=>{
            return{
              value:item.name,
              label: item.name
            }
          })
          setProperty(property);

        }
      } catch (error) {
        console.error();
      }
    };
    fetchApi();
  }, [propertyId]);


  return (
    <>
      <h2>Thông tin chi tiết khách sạn</h2>
      {property && (
        <>
          <Form layout="vertical" style={{ maxWidth: 600 }} initialValues={property}>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Tên khách sạn</h3>}
              name="name"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item label={<h3 style={{ color: "#0057B8" }}>Ảnh</h3>}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {property.images.map((image, index) => (
                  <img
                    src={image}
                    style={{
                      width: "200px",
                      height: "150px",
                      marginRight: "20px",
                      borderRadius: "20px",
                    }}
                    alt="Ảnh khách sạn"
                  />
                ))}
              </div>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Địa chỉ</h3>}
              name="address"
            >
              <Input readOnly />
            </Form.Item>
            <h3 style={{ color: "#0057B8" }}>Đánh giá</h3>
            <Row>
              <Col span={8}>
                <Form.Item
                  label={<b>Điểm đánh giá</b>}
                  name="avgReviewScore"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá sạch</b>}
                  name="ratingClean"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá thoải mái</b>}
                  name="ratingComfort"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá tiện ích</b>}
                  name="ratingFacilities"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá vị trí</b>}
                  name="ratingLocation"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá nhân viên</b>}
                  name="ratingStaff"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Đánh giá wifi</b>}
                  name="ratingWifi"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<b>Số lượng đánh giá</b>}
                  name="numReviews"
                >
                  <InputNumber readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Loại</h3>}
              name="propertyType"
            >
              <Input readOnly/>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Slug</h3>}
              name="slug"
            >
              <Input readOnly/>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Tiệc ích</h3>}
            >
              <Select options={property.facilities} defaultValue={property.facilities[0]}/>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Danh sách phòng</h3>}
            >
              <Select options={property.rooms} defaultValue={property.rooms[0]}/>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Danh sách loại phòng</h3>}
            >
              <Select options={property.roomTypes} defaultValue={property.roomTypes[0]}/>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Mô tả</h3>}
              name="overview"
            >
              <TextArea  rows={10} readOnly/>
            </Form.Item>
          </Form>
          <Button type="primary">
            <Link to={`/admin/properties/edit/${propertyId}`}>Chỉnh sửa</Link>
          </Button>
        </>
      )}
    </>
  );
}
export default PropertyDetailAdmin;
