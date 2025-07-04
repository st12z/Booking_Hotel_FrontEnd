import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPropertyId,
  updateProperty,
} from "../../service/RoomService/PropertyService";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  notification,
  Popconfirm,
  Row,
  Select,
  Upload,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  getAllRoomTypes,
  updateFreeServicesOfRoomType,
} from "../../service/RoomService/RoomTypeService";
import { getAllPropertyTypes } from "../../service/RoomService/PropertyTypeService";
import "./EditProperty.scss";
import { getFacilities } from "../../service/RoomService/FacilityService";
import { useForm } from "antd/es/form/Form";
import { createRoom, deleteRoom } from "../../service/RoomService/RoomService";
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

function EditProperty() {
  const params = useParams();
  const propertyId = params.id;
  const [property, setProperty] = useState();
  const [facilities, setFacilities] = useState();
  const [images, setImages] = useState();
  const [roomTypes, setRoomTypes] = useState();
  const [propertyTypes, setPropertyTypes] = useState();
  const [allFacilities, setAllFacilites] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [form] = Form.useForm();
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [currentRoomType, setCurrentRoomType] = useState();
  const [loading, setLoading] = useState(false);
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
    const updatedList = newFileList.map((file) => {
      if (!file.url && file.originFileObj) {
        return {
          ...file,
          url: URL.createObjectURL(file.originFileObj),
        };
      }
      return file;
    });

    // Cập nhật fileList
    setFileList(updatedList);

    // Tạo mảng images từ url
    const images = updatedList.map((item) => item.url);
    setImages(images);
  };
  // nút button
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  // end upload image

  async function urlToFile(url, filename) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const blob = await res.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (err) {
      console.error(`❌ Không fetch được ảnh: ${url}`, err);
      return null; // hoặc throw nếu muốn dừng luôn
    }
  }

  async function convertToFileListFromUrls(urls) {
    const fileList = await Promise.all(
      urls.map((url, index) =>
        urlToFile(url, `image-${index}.jpg`).then((file) => {
          if (url) {
            return {
              uid: `image-${index}`,
              name: `image-${index}.jpg`,
              status: "done",
              url: url,
              originFileObj: file,
            };
          }
        })
      )
    );
    return fileList;
  }
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getPropertyId(propertyId);
        const resPropertyTypes = await getAllPropertyTypes();
        const resFacilities = await getFacilities();
        if (resFacilities.code == 200) {
          if (res.data.facilities && res.data.facilities.length > 0) {
            const allFacilities = resFacilities.data.map((item) => {
              return { label: item.name, value: item.id };
            });
            const facilities = res.data.facilities.map((facility1) => {
              const item = allFacilities.find(
                (facility2) => facility2.label == facility1
              );
              return item.value;
            });
            setFacilities(facilities || []);
            setAllFacilites(allFacilities);
          }
        }
        if (resPropertyTypes.code == 200) {
          if (resPropertyTypes.data && resPropertyTypes.data.length > 0) {
            const propertyTypes = resPropertyTypes.data.map((item) => {
              return {
                value: item,
                label: item,
              };
            });
            setPropertyTypes(propertyTypes);
          }
        }
        if (res.data.images && res.data.images.length > 0) {
          const mappedFileList = res.data.images.map((url, index) => ({
            uid: `image-${index}`,
            name: `image-${index}.jpg`,
            status: "done",
            url: url,
          }));
          setFileList(mappedFileList);
        }
        if (res.code == 200) {
          setImages(res.data.images);
          if (res.data.roomTypes && res.data.roomTypes.length > 0) {
            const roomTypes = res.data.roomTypes.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            });
            setCurrentRoomType(roomTypes[0].value || "");
            setRoomTypes(roomTypes || []);
          }
          setProperty(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [propertyId]);
  const handleSubmit = async (e) => {
    const newFacilities = facilities.map((facility1) => {
      const findFacility = allFacilities.find(
        (facility2) => facility2.value == facility1
      );
      return findFacility.label;
    });
    const data = {
      id: property.id,
      ...e,
      facilities: newFacilities,
    };
    const formData = new FormData();
    formData.append("property", JSON.stringify(data));
    const fileList = await convertToFileListFromUrls(images);
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj); // Lấy đúng File object
      });
    }
    console.log(data);
    console.log(fileList);
    try {
      setLoading(true);
      const res = await updateProperty(formData);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Cập nhật thành công!", "green");
      } else {
        openNotification("topRight", "Cập nhật thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Cập nhật thất bại!", "red");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const confirm = (index) => {
    const imagesCurrent = images.filter((item, i) => i != index);
    setImages(imagesCurrent);
    const fileList = imagesCurrent.map((url, index) => ({
      uid: `image-${index}`,
      name: `image-${index}.jpg`,
      status: "done",
      url: url,
    }));
    setFileList(fileList);
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleChangeFacilities = (e) => {
    console.log(e);
    setFacilities((facilities) => {
      return e.map((item) => item);
    });
  };
  const handleAddImage = () => {
    setIsUpload(!isUpload);
  };
  const handleChangeRoomTypes = (value) => {
    console.log(value);
    setCurrentRoomType(value);
  };
  const rules = [{ required: true, message: "Vui lòng nhập trường này!" }];
  return (
    <>
      {contextHolder}
      <h2>Chỉnh sửa thông tin khách sạn</h2>
      {property && (
        <>
          <Form
            layout="vertical"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
            initialValues={property}
            form={form}
          >
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Tên khách sạn</h3>}
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>
            {/* Ảnh */}
            <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
            <div className="image">
              {images.map((image, index) => (
                <div className="image__item">
                  <img src={image} key={index} />
                  <Popconfirm
                    title="Xóa ảnh"
                    description="Bạn có chắc xóa ảnh này không ?"
                    onConfirm={() => confirm(index)}
                    onCancel={() => cancel(index)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="delete-image">X</span>
                  </Popconfirm>
                </div>
              ))}
            </div>
            {isUpload && (
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
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            )}
            {isUpload ? (
              <Button onClick={handleAddImage} style={{ marginTop: "20px" }}>
                Ẩn
              </Button>
            ) : (
              <Button onClick={handleAddImage} style={{ marginTop: "20px" }}>
                Thêm mới
              </Button>
            )}
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Địa chỉ</h3>}
              name="address"
              rules={rules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Loại</h3>}
              name="propertyType"
            >
              <Select options={propertyTypes} />
            </Form.Item>
            <Form.Item label={<h3 style={{ color: "#0057B8" }}>Tiện ích</h3>}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChangeFacilities}
                options={allFacilities}
                defaultValue={facilities}
              />
            </Form.Item>

            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Slug</h3>}
              name="slug"
              rules={rules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Danh sách loại phòng</h3>}
            >
              <Button
                color="primary"
                variant="solid"
                style={{ marginBottom: "10px", marginRight: "10px" }}
              >
                <Link to={`/admin/properties/room-types/${propertyId}`}>
                  <PlusOutlined /> Thêm loại phòng
                </Link>
              </Button>
              <Button
                color="primary"
                variant="solid"
                style={{ marginBottom: "10px" }}
              >
                <Link
                  to={`/admin/properties/room-types/edit/${currentRoomType}`}
                >
                  <EditOutlined /> Chỉnh sửa loại phòng
                </Link>
              </Button>
              <Select
                options={roomTypes}
                value={currentRoomType}
                onChange={handleChangeRoomTypes}
              />
            </Form.Item>
            <Form.Item
              label={<h3 style={{ color: "#0057B8" }}>Mô tả</h3>}
              name="overview"
              initialValue={property.overview}
              rules={rules}
            >
              <TextArea rows={10} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form>
        </>
      )}
    </>
  );
}
export default EditProperty;
