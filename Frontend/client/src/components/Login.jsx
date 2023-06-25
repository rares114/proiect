import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await axios.post("/users/login", values);
    try {
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Login successful");
        const isShop = response.data.isshop;
        const token = response.data.token;
        localStorage.setItem("token", token);

        if (isShop === 1) {
          navigate("/shop");
        } else {
          navigate("/regular-user");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
