import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../../config";
import { Button, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const TabInformatiileMele = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${server_url}/shops/me`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Informațiile au fost actualizate");
      } else {
        toast.error("Nu s-au putut actualiza informațiile");
      }
    } catch (error) {
      toast.error("A apărut o problemă");
    }
  };

  return (
    <div>
      <div className="infomele-containter">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="shopName" label="Numele magazinului">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email de contact">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Adresa">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descriere">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="schedule" label="Program">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="nav-btn">
              Actualizează
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TabInformatiileMele;
