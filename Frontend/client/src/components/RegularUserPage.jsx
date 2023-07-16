import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegularUserPage = ({ setSelectedProduct }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server_url}/users/allproducts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data[0]);
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Te-ai fost deconectat");
    navigate("/");
  };

  const handleProductClick = (record) => {
    setSelectedProduct(record);
    navigate("/produsul");
  };

  const handleShopClick = (record) => {
    const shopId = record.shop;
    navigate(`/magazinul/${shopId}`);
  };

  const columns = [
    {
      title: "Denumire",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          className="clickable-text"
          onClick={() => handleProductClick(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Cantitate",
      render: (_, record) => <>{record.quantity + " " + record.um}</>,
    },
    {
      title: "Pret",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Magazin",
      dataIndex: "shop_name",
      key: "shop_name",
      render: (text, record) => (
        <span
          className="clickable-text"
          onClick={() => handleShopClick(record)}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="container">
      <Table
        columns={columns}
        dataSource={data}
        className="tabelTotal"
        rowClassName="clickable-row"
        onRow={(record) => ({
          onClick: () => {},
        })}
      />
      <div className="buttonWrapper">
        <Button type="primary" className="logout" onClick={handleLogout}>
          Deconectare
        </Button>
      </div>
    </div>
  );
};

export default RegularUserPage;
