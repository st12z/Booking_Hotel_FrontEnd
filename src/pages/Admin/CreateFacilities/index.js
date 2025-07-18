import { Button, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  createFacility,
  getFacilityById,
  updateFacility,
} from "../../../service/RoomService/FacilityService";

function CreateFacilities() {
  const [form] = Form.useForm();
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
  const handleSubmit = async (e) => {
    try {
      const res = await createFacility(e);
      console.log(res);
      if ((res.code = 200)) {
        openNotification("topRight", "Tạo mới thành công!", "green");
      } else {
        openNotification("topRight", "Tạo mới thất bại!", "red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Tạo mới thất bại!", "red");
    }finally{
      form.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <h2>Chỉnh sửa tiện ích</h2>
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
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary" style={{ marginTop: "20px" }}>
          Tạo mới
        </Button>
      </Form>
    </>
  );
}
export default CreateFacilities;
