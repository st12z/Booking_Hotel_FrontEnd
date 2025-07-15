import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getAllCities } from "../../../service/RoomService/CityService";
import { getFacilities } from "../../../service/RoomService/FacilityService";
import { getAllPropertyTypes } from "../../../service/RoomService/PropertyTypeService";
import { createProperty } from "../../../service/RoomService/PropertyService";
import { useForm } from "antd/es/form/Form";
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
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function CreateProperties() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allFacilities, setAllFacilites] = useState();
  const [allCities, setAllCities] = useState();
  const [allPropertyTypes, setAllPropertyTypes] = useState();
  const [facilities, setFacilities] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [errorImages, setErrorImages] = useState(false);
  const [form] = Form.useForm();
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
        const resCities = await getAllCities();
        const resFacilities = await getFacilities();
        const resPropertyTypes = await getAllPropertyTypes();
        console.log("resCities", resCities);
        console.log("resFacilities", resFacilities);
        console.log("resPropertyTypes", resPropertyTypes);
        if (resCities.code == 200) {
          const cities = resCities.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setAllCities(cities);
        }
        if (resFacilities.code == 200) {
          const facilities = resFacilities.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setAllFacilites(facilities);
        }
        if (resPropertyTypes.code == 200) {
          const propertyTypes = resPropertyTypes.data.map((item) => ({
            value: item,
            label: item,
          }));
          setAllPropertyTypes(propertyTypes);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
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
  const handleChange = ({ fileList: newFileList }) => {
    if (fileList.length > 0) setErrorImages(false);
    setFileList(newFileList);
  };
  // nút button
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleChangeFacilities = (e) => {
    setFacilities(e);
  };

  const handleSubmit = async (e) => {
    if (fileList.length == 0) {
      setErrorImages(true);
      return;
    }
    setLoading(true);
    const data = {
      ...e,
      facilities: facilities,
    };

    console.log(data);
    const formData = new FormData();
    formData.append("propertyRequestDto", JSON.stringify(data));
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj); // Lấy đúng File object
      });
    }
    try {
      const res = await createProperty(formData);
      if (res.code == 200) {
        openNotification("topRight", "Tạo mới thành công!", "green");
      } else {
        openNotification("topRight", "Tạo mới thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Tạo mới thất bại!", "red");
      console.error(error);
    } finally {
      setFileList([]);
      setPreviewImage([]);
      setLoading(false);
      form.resetFields();
      setFacilities([]);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Tên khách sạn</h3>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khách sạn!" }]}
        >
          <Input />
        </Form.Item>
        {/* Ảnh */}
        <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
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
            {uploadButton}
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
          {errorImages && <p style={{ color: "red" }}>*Vui lòng upload ảnh </p>}
        </Form.Item>
        <Form.Item
          name="cityId"
          label={<h3 style={{ color: "#0057B8" }}>Thành phố</h3>}
          rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
        >
          <Select options={allCities} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Vĩ độ</h3>}
          name="latitude"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vĩ độ!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Kinh độ</h3>}
          name="longitude"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập kinh độ!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={
            <h3
              style={{ color: "#0057B8" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ chi tiết khách sạn!",
                },
              ]}
            >
              Địa chỉ chi tiết
            </h3>
          }
          name="address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Loại khách sạn</h3>}
          name="propertyType"
          rules={[{ required: true, message: "Vui lòng chọn loại khách sạn!" }]}
        >
          <Select options={allPropertyTypes} />
        </Form.Item>
        <Form.Item
          label={
            <h3 style={{ color: "#0057B8" }} name="facilities">
              Tiện ích
            </h3>
          }
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChangeFacilities}
            options={allFacilities}
            value={facilities}
          />
        </Form.Item>
        <Form.Item
          label={
            <h3
              style={{ color: "#0057B8" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả!",
                },
              ]}
            >
              Mô tả
            </h3>
          }
          name="overview"
        >
          <TextArea rows={10} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật
        </Button>
      </Form>
    </>
  );
}
export default CreateProperties;
