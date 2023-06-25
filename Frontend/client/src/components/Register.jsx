import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../config";
import { Button, Checkbox, Form, Input } from "antd";

const Register = ({ onRegisterClose }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    values.isshop = values.isshop === true ? 1 : 0;

    try {
      const response = await axios.post(`${server_url}/users`, values);

      if (response.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        toast.error("Account creation failed");
      }
    } catch (error) {
      toast.error("Account creation failed");
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
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm password" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="isshop"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Is shop</Checkbox>
        </Form.Item>
        <div className="login-link-container">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
