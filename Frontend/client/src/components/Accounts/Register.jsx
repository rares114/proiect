import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../../config";
import { Button, Checkbox, Form, Input } from "antd";

const Register = ({ onRegisterClose }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Parolele nu se potrivesc");
      return;
    }

    values.isshop = values.isshop === true ? 1 : 0;

    try {
      const response = await axios.post(`${server_url}/users`, values);

      if (response.status === 201) {
        toast.success("Cont creat cu succes");
        navigate("/login");
      } else {
        toast.error("Crearea contului nu a reușit");
      }
    } catch (error) {
      toast.error("Crearea contului nu a reușit");
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <Form 
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        labelAlign="left"
        onFinish={onFinish}
      >
        <Form.Item label="Nume" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Parolă" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirmare parolă" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="isshop"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>Te înregistrezi ca magazin?</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className='nav-btn'>
          Înregistrare
          </Button>
        </Form.Item>
        <div className="login-link-container">
          <p>
            Ai deja un cont? <Link to="/login" className="green-link">Loghează-te</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
