import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllDiscountType,
  getDiscountHotelById,
  updatDiscountHotel,
} from "../../../service/RoomService/DiscountService";
import dayjs from "dayjs";
import { formatLocalDateTime2 } from "../../../utils/format";
const { RangePicker } = DatePicker;

function EditDiscountHotels() {
  const params = useParams();
  const id = params.id;
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [errorImage, setErrorImage] = useState(false);
  const [discountHotel, setDiscountHotel] = useState();
  const [dataDiscountType, setDataDiscountType] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resDiscountType = await getAllDiscountType();
        console.log(resDiscountType);
        if (resDiscountType.code == 200) {
          const discountTypes = resDiscountType.data.map((item) => ({
            label: item,
            value: item,
          }));
          setDataDiscountType(discountTypes);
        }
        const res = await getDiscountHotelById(id);
        console.log(res);
        if (res.code === 200) {
          setDiscountHotel(res.data);
          form.setFieldsValue(res.data);
          const startDate = res.data.startDate; // là chuỗi
          const endDate = res.data.endDate;

          const formattedStart = dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss");
          const formattedEnd = dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss");
          setStartDate(formattedStart);
          setEndDate(formattedEnd);
          form.setFieldsValue({
            time_value: [dayjs(res.data.startDate), dayjs(res.data.endDate)],
          });
          const imageUrl = res.data.image;
          setPreviewImage(imageUrl);
          if (imageUrl) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const filename = imageUrl.split("/").pop() || "image.jpg";
            const fileFromUrl = new File([blob], filename, { type: blob.type });
            setFile(fileFromUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [id]);
  const handleChangRangePicker = (dates, dateStrings) => {
    console.log("Selected dates:", dates, dateStrings);
    if (dates) {
      const formattedStart = dates[0].format("YYYY-MM-DDTHH:mm:ss");
      const formattedEnd = dates[1].format("YYYY-MM-DDTHH:mm:ss");
      setStartDate(formatLocalDateTime2(formattedStart));
      setEndDate(formatLocalDateTime2(formattedEnd));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  const handleChangeImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const imageUrl = URL.createObjectURL(selected);
      setPreviewImage(imageUrl);
    }
  };
  const handleSubmit = async (e) => {
    console.log(e);
    if (!previewImage) {
      setErrorImage(true);
      return;
    }
    try {
      setLoading(true);
      const data = {
        code: e.code,
        discountType: e.discountType,
        discountValue: e.discountValue,
        startDate: startDate,
        endDate: endDate,
        quantity: e.quantity,
      };
      console.log(data);
      const formData = new FormData();
      formData.append("discountHotel", JSON.stringify(data));
      formData.append("file", file);
      const res = await updatDiscountHotel(id, formData);
      console.log(res);
      if (res.code == 200) {
        openNotification(
          "topRight",
          "Cập nhật discount-hotel thành công!",
          "green"
        );
      } else {
        openNotification(
          "topRight",
          "Cập nhật discount-hotel thất bại!",
          "red"
        );
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Cập nhật discount-hotel thất bại!", "red");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      {discountHotel && (
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Mã code</h3>}
            name="code"
            rules={[
              {
                required: true,
                message: "Vui lòng  mã code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
          <div className="image" style={{ marginBottom: "20px" }}>
            <Image src={previewImage} style={{ width: "300px" }} />
          </div>
          <input type="file" accept="*" onChange={handleChangeImage} />
          {errorImage && <h4 style={{ color: "red" }}>Vui lòng upload ảnh</h4>}
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Loại phiếu giảm giá</h3>}
            name="discountType"
            rules={[
              { required: true, message: "Vui lòng chọn loại phiếu giảm giá!" },
            ]}
          >
            <Select options={dataDiscountType} />
          </Form.Item>
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Giá trị</h3>}
            name="discountValue"
            rules={[
              {
                required: true,
                message: "Vui lòng giá trị hợp lý!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Số lượng</h3>}
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng giá trị hợp lý!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Thời gian có hiệu lực</h3>}
            name="time_value"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời gian có hiệu lực!",
              },
            ]}
          >
            <RangePicker onChange={handleChangRangePicker} />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            style={{ marginTop: "20px" }}
            loading={loading}
          >
            Cập nhật
          </Button>
        </Form>
      )}
    </>
  );
}
export default EditDiscountHotels;
