import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyTypeById, updatePropertyType } from "../../../service/RoomService/PropertyTypeService";
import { Button, Form, Input, notification } from "antd";

function EditPropertyType() {
  const params = useParams();
  const id = params.id;
  const [propertyType, setPropertyType] = useState();
  const [api, contextHolder] = notification.useNotification();
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
        const res = await getPropertyTypeById(id);
        if (res.code == 200) {
          setPropertyType(res.data);
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [id]);
  const handleSubmit = async(e)=>{
    try{
      const res = await updatePropertyType(id,e);
      if(res.code==200){
        openNotification("topRight","Cập nhật property-type thành công!","green");
      }
      else{
         openNotification("topRight","Cập nhật property-type thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Cập nhật property-type thất bại!","red");
      console.error(error);
    }
  }
  return (
    <>
      {contextHolder}
      {propertyType && (
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Tên loại khách sạn</h3>}
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng tên loại!",
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
export default EditPropertyType;
