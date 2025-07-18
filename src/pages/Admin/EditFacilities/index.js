import { Button, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getFacilityById, updateFacility } from "../../../service/RoomService/FacilityService";

function EditFacilities() {
  const params = useParams();
  const id = params.id;
  const [form] = Form.useForm();
  const [facility, setFacility] = useState();
  const [api, contextHolder] = notification.useNotification();
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
        const res = await getFacilityById(id);
        if (res.code == 200) {
          form.setFieldsValue(res.data);
          setFacility(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [id]);
  const handleSubmit = async (e) => {
    try {
      const res = await updateFacility(id, e);
      if ((res.code = 200)) {
        openNotification("topRight","Cập nhật thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật thất bại!","red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight","Cập nhật thất bại!","red");
    }
  };
  return (
    <>
      {contextHolder}
      <h2>Chỉnh sửa tiện ích</h2>
      {facility && (
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Tên tiện ích</h3>}
            name="name"
            rules={[
              {
                message: "Vui lòng nhập tên tiện ích",
                required:true
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginTop: "20px" }}
          >
            Cập nhật
          </Button>
        </Form>
      )}
    </>
  );
}
export default EditFacilities;
