import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import "./AddFormUser.css";

function FormAdd({ getApi, setTableParams, tableParams }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://prod.example.fafu.com.vn/employee",
        data: values,
      });
      if (tableParams.pagination.current === 1) {
        getApi();
      }

      localStorage.setItem("currentPage", 1);
      setTableParams((tableParams) => ({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: 1,
        },
      }));
      handleCancel();
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Student
      </Button>
      <Modal
        title="Add student"
        open={open}
        onOk={onFinish}
        onCancel={handleCancel}
        footer={[,]}
      >
        <div className="modal-content">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            form={form}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="User"
              name="username"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstname"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your first name!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your last name!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your phone!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your email!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your birthday!",
              //   },
              // ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Gender "
              name="gender"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your gender!",
              //   },
              // ]}
            >
              <Radio.Group>
                <Radio value="0">Man</Radio>
                <Radio value="1">Woman</Radio>
              </Radio.Group>
            </Form.Item>

            <div className="btn-sub">
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onFinish}
                className="abc"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default FormAdd;
