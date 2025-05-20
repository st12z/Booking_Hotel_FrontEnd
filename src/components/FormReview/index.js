import {
  Input,
  Progress,
  Form,
  Slider,
  Row,
  Col,
  Button,
  message,
  Rate,
  notification,
  Upload,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import SliderRatingStaff from "../SliderRatingStaff";
import "./FormReview.scss";
import SliderRatingFacilities from "../SliderRatingFacilities";
import SliderRatingClean from "../SliderRatingClean";
import SliderRatingWifi from "../SliderRatingWifi";
import SliderRatingComfort from "../SliderRatingComfort";
import SliderRatingLocation from "../SliderRatingLocation";
import { useSelector } from "react-redux";
import {
  createReview,
  createView,
  getAmountReviews,
} from "../../service/RoomService/ReviewService";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import { connectStomp } from "../../utils/connectStomp";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function FormReview({ propertyId }) {
  const user = useSelector((state) => state.user);
  const [ratingStaff, setRatingStaff] = useState(10);
  const [ratingFacilities, setRatingFacilities] = useState(10);
  const [ratingClean, setRatingClean] = useState(10);
  const [ratingComfort, setRatingComfort] = useState(10);
  const [ratingWifi, setRatingWifi] = useState(10);
  const [ratingLocation, setRatingLocation] = useState(10);
  const [loading, setLoading] = useState(false);
  const [ratingProperty, setRatingProperty] = useState(5);
  const [api, contextHolder] = notification.useNotification();
  const [stompClient, setStompClient] = useState(null);
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
  // socket message gửi tin nhắn
  useEffect(() => {
    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);
    console.log(socket);
    client.connect({}, () => {
      console.log("Connected to stomp");
      setStompClient(client);
    });

    return () => {
      if (client) {
        console.log("disconnected");
        client.disconnect();
      }
    };
  }, []);
  const [form] = useForm();
  // Upload ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  // preview ảnh
  const handlePreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });
  // lắng nghe upload ảnh
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // nút button
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  // end upload image

  const fetchApi = async (data) => {
    setLoading(true);
    try {
      const res = await createReview(data);
      if (res.code == 201) {
        openNotification("topRight", "Gửi đánh giá thành công!", "green");
          connectStomp("/app/sendAmountReviews",`Tài khoản ${user.email} vừa đánh giá thành công!`);
      } else {
        openNotification("topRight", "Gửi đánh giá thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Gửi đánh giá thất bại!", "red");
      console.error(error);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    console.log(e);
    if (!user || Object.keys(user).length === 0) {
      openNotification(
        "topRight",
        "Vui lòng đăng nhập trước khi đánh giá!",
        "green"
      );
      return;
    }
    const formData = new FormData();
    console.log(propertyId);
    formData.append(
      "reviewDto",
      JSON.stringify({
        userId: user.id,
        content: e.content,
        ratingClean: ratingClean,
        ratingStaff: ratingStaff,
        ratingFacilities: ratingFacilities,
        ratingComfort: ratingComfort,
        ratingWifi: ratingWifi,
        ratingLocation: ratingLocation,
        ratingProperty: ratingProperty,
        propertyId: propertyId,
      })
    );
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj); // Lấy đúng File object
      });
    }
    if (fileList.length == 0) {
      setLoading(true);
      setTimeout(() => {
        fetchApi(formData);
        stompClient.send(
          "/app/sendNotification",
          {},
          JSON.stringify({
            content: `${user.email} đã đánh giá khách sạn ${propertyId}!`,
          })
        );
        setLoading(false);
      }, 1000);
      return;
    }
    fetchApi(formData);
  };
  return (
    <>
      {contextHolder}
      <div className="form-reviews" style={{ width: "80%" }}>
        <h2>Biểu mẫu đánh giá khách hàng</h2>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Vui lòng gửi nội dung đánh giá!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="form-reviews__rating">
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <SliderRatingStaff
                  ratingStaff={ratingStaff}
                  onSetRating={setRatingStaff}
                  title={"Staff"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingFacilities
                  ratingFacilities={ratingFacilities}
                  onSetRating={setRatingFacilities}
                  title={"Facilities"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingClean
                  ratingClean={ratingClean}
                  onSetRating={setRatingClean}
                  title={"Cleanliness"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingComfort
                  ratingComfort={ratingComfort}
                  onSetRating={setRatingComfort}
                  title={"Comfort"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingWifi
                  ratingWifi={ratingWifi}
                  onSetRating={setRatingWifi}
                  title={"Wifi"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingLocation
                  ratingLocation={ratingLocation}
                  onSetRating={setRatingLocation}
                  title={"Location"}
                />
              </Col>
            </Row>
          </div>
          <Form.Item>
            <h3 style={{ margin: "0" }}>Property</h3>
            <Rate onChange={setRatingProperty} value={ratingProperty} />
          </Form.Item>
          <Form.Item>
            <Upload
              listType="picture-card"
              customRequest={({ file, onSuccess }) => {
                // Upload giả lập
                setTimeout(() => {
                  onSuccess("ok"); // 👈 báo đã thành công
                }, 0);
              }}
              fileList={fileList || []}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            {previewImage > 0 && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Gửi đánh giá
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default FormReview;
