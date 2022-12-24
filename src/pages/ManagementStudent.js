import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormAdd from "../components/AddFormUser";

const ManagementStudent = () => {
  const [user, setUser] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
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
      title: "User name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full name",
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
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            handleDeleteUser(record.id);
          }}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              handleUpdate(record.id, record);
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
        setSearchParams({ page: tableParams.pagination.current });
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getApi();
  }, [tableParams.pagination.current]);

  const handleTableChange = (pagination) => {
    setSearchParams({ page: pagination.current });
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
