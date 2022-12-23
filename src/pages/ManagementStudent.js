import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAdd from "../components/AddFormUser";

const ManagementStudent = () => {
  const [user, setUser] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 3,
    },
  });
  let navigate = useNavigate();

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và tên",
      dataIndex: "",
      render: (name) => `${name.firstname} ${name.lastname}`,
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => (
        <>
          <DeleteOutlined
            onClick={() => {
              handleDeleteUser(record.id);
            }}
          />
        </>
      ),
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              handleUpdate(record.id);
            }}
          />
        </>
      ),
    },
  ];

  const getApi = async () => {
    try {
      const response = await axios.get(
        `http://prod.example.fafu.com.vn/employee?page=${
          tableParams.pagination.current - 1
        }&size=${tableParams.pagination.pageSize}`
      );
      if (response?.data) {
        setUser(response?.data?.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response?.data?.total_count,
          },
        });
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    getApi();
  }, [tableParams.pagination.current]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://prod.example.fafu.com.vn/employee/${id}`);
    setUser(user.filter((p) => p.id !== user.id));
    getApi();
  };

  const handleUpdate = (id) => {
    navigate(`user/${id}`);
  };
  return (
    <>
      <FormAdd getApi={getApi} user={user} setUser={setUser} />
      <Table
        columns={columns}
        dataSource={user}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ManagementStudent;
