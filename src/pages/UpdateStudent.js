import { Button, Form, Input, Skeleton, DatePicker, Radio, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const UpdateStudent = () => {
  const dateFormat = "YYYY/MM/DD";
  const { id } = useParams();
  const [form] = Form.useForm();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await axios({
      method: "post",
      url: "http://prod.example.fafu.com.vn/employee",
      data: { ...values, id: id },
    });
    navigate("/");
  };

  const getStudentDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://prod.example.fafu.com.vn/employee/${id}`
      );
      if (response?.data) {
        setUser(response?.data);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPage = () => {
    navigate("/");
  };

  useEffect(() => {
    getStudentDetail();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={user}
    >
      <Form.Item
        label="User"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="First Name"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="birthday"
        rules={[
          {
            required: true,
            message: "Please input your birthday!",
          },
        ]}
      >
        <Space direction="vertical">
          <DatePicker
            defaultValue={dayjs(user?.birthday, dateFormat)}
            format={dateFormat}
          />
        </Space>
      </Form.Item>

      <Form.Item
        label="Gender "
        name="gender"
        rules={[
          {
            required: true,
            message: "Please input your gender!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={0}>Man</Radio>
          <Radio value={1}>Woman</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={handleBackPage}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UpdateStudent;
