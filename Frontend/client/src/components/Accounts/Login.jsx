import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/users/login", values);
  
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
    }
  };
  

  return (
    <div className="login-container">
      <Form
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Parolă" name="password">
        <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className='nav-btn'>
            Logare
          </Button>
        </Form.Item>
        <div className="login-link-container">
          <p>
            Nu ai înca un cont? <Link to="/register" className="green-link">Înregistrează-te</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
