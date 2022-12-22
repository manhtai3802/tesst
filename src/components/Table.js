import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import FormAdd from "./AddFormUser";
import EditFormUser from "./EditFormUser";

const Tables = ({ user }) => {
  const [data, setData] = useState();

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "1",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "2",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "3",
    },
    {
      title: "Phone",
      dataIndex: "phone",

      key: "4",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => (
        <>
          <DeleteOutlined
            onClick={() => {
              handleDeleteUser(record);
            }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleDeleteUser = (record) => {
    setData((data) => {
      return data.filter((user) => user.id !== record.id);
    });
  };

  return (
    <div>
      <FormAdd data={data} setData={setData} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Tables;
