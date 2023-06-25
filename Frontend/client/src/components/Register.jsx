import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../config";

const Register = ({ onRegisterClose }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isshop, setIsShop] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleShopCheck = (e) => {
    setIsShop(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (isshop === true) toast.success("DA");
    else toast.error("NU");

    const payload = {
      name,
      email,
      password,
      phone,
      isshop,
    };

    try {
      const response = await axios.post(`${server_url}/users`, payload);

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
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="register-input"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="register-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="register-input"
          />
        </div>

        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={
              password !== confirmPassword
                ? "register-input mismatch"
                : "register-input"
            }
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="register-input"
          />
        </div>
        <div>
          <label>Are you a Shop?</label>
          <input type="checkbox" checked={isshop} onChange={handleShopCheck} />
        </div>
        <div className="register-button-container">
          <button type="submit">Register</button>
        </div>
        <div className="login-link-container">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
