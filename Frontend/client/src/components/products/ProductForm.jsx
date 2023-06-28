import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../../config";

const { Option } = Select;

const ProductForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${server_url}/shops/product`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Produs adăugat");
      } else {
        toast.error("Nu s-a putut adăuga produsul");
      }
    } catch (error) {
      toast.error("A aparut o problema");
      console.log(error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item label="Denumire" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Cantitate" name="quantity">
        <InputNumber />
      </Form.Item>
      <Form.Item label="UM" name="um">
        <Select
          allowClear
        >
          <Option value="kg">KG</Option>
          <Option value="l">L</Option>
          <Option value="buc">Buc</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Pret" name="price">
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Adaugă
          </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
