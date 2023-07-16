import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { server_url } from "../config";

const DeleteProductForm = () => {
  const [productId, setProductId] = useState("");

  const onFinish = async () => {
    try {
      const response = await axios.delete(`${server_url}/shops/productREM`, {
        data: {
          productId: productId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Produs sters");
      } else {
        toast.error("Nu s-a putut sterge produsul");
      }
    } catch (error) {
      toast.error("A aparut o problema");
      console.log(error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item label="Introdu numele produsului:" name="productId">
        <Input value={productId} onChange={(e) => setProductId(e.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="nav-btn">
          Sterge
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteProductForm;
