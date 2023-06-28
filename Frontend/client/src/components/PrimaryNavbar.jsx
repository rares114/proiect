import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'antd';

const PrimaryNavbar = () => {
  return (
    <div className="primary-navbar">
      <Link to="/">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Acasă
          </Button>
      </Link>
      <Link to="/login">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Logare
          </Button>
      </Link>
      <Link to="/register">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Register
          </Button>
      </Link>
      <Link to="/faq">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            FAQ
          </Button>
      </Link>
      <Link to="/about">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Despre noi
          </Button>
      </Link>
      <Link to="/contact">
      <Button type="primary" htmlType="submit" className='nav-btn'>
            Contact
          </Button>
      </Link>
    </div>
  );
};

export default PrimaryNavbar;
