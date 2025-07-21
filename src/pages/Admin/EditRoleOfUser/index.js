import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInfoUser,
  getInfoUserById,
  updateRolesByUserId,
} from "../../../service/UserService/AuthService";
import { Button, Form, notification, Select } from "antd";
import { getAllRoles, getAllRolesAdmin } from "../../../service/UserService/RoleService";

function EditRoleOfUser() {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [dataRoles, setDataRoles] = useState([]);
  const [roles, setRoles] = useState([]);
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
        const res = await getInfoUserById(id);
        const resDataRoles = await getAllRolesAdmin();
        if (resDataRoles.code == 200) {
          const roles = resDataRoles.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          console.log("all-roles", roles);
          setDataRoles(roles);
        }
        if (res.code == 200) {
          console.log("user",res.data);
          const roles = res.data.roleDtos.filter(item=>item.id!=1).map(item=>item.id);
          console.log("roles of user",roles);
          setRoles(roles);
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  const handleChangeRoles = (e) => {
    setRoles(e);
  };
  const handleSubmit = async () => {
    try {
      const exist = user.roleDtos.find(item=>item.id==1);
      let newRoles = [...roles]
      if(exist){
        newRoles.push(exist.id)
      }
      console.log(newRoles);
      const res = await updateRolesByUserId(id,roles);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Cập nhật thành công!", "green");
      } else {
        openNotification("topRight", "Cập nhật thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Cập nhật thất bại!", "red");
      console.error(error);
    }
  };
  return (
    <>
      {contextHolder}
      <h2>Thay đổi role của user id-{id}</h2>
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item label={<h3 style={{ color: "#0057B8" }}>Roles</h3>}>
          <Select
            value={roles}
            mode="multiple"
            allowClear
            style={{ width: "240" }}
            placeholder="Please select"
            onChange={handleChangeRoles}
            options={dataRoles}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </>
  );
}
export default EditRoleOfUser;
