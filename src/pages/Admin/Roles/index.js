import { Button, notification, Table } from "antd";
import { useEffect, useState } from "react";
import {  getAllRolesByPage } from "../../../service/UserService/RoleService";
import { Link } from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
function Roles() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllRolesByPage(pageNo,pageSize);
        if(res.code==200){
          setData(res.data.dataPage);
          setTotal(res.data.total);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  const columns = [
    {
      title: "Mã ID",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.id}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tên role",
      key: "name",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.name}</b>
          </p>
        </>
      ),
    },
  ];
  return (
    <>
  
      <h2>Danh sách roles</h2>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/roles/create">
          <PlusOutlined />
          Tạo mới
        </Link>
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pageNo,
          pageSize: pageSize,
          total: total,
          onChange: (page, size) => {
            setPageNo(page);
            setPageSize(size);
          },
        }}
      />
    </>
  );
}
export default Roles;
