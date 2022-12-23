import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
function FormAdd({ getApi }) {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const onFinish = async (values) => {
    const response = await axios({
      method: "post",
      url: "http://prod.example.fafu.com.vn/employee",
      data: values,
    });
    getApi();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
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
                name="firstName"
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
                name="lastName"
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
                label="ID"
                name="id"
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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default FormAdd;
