import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../config";
import {Button} from 'antd';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductsTable = () => {
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
      console.log(response.data[0])
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const columns = [
    {
      title: "Denumire",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "shop",
      key: "shop",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Te-ai fost deconectat");
    navigate("/");
  };

  return (
    <div className="container">
      <Table columns={columns} dataSource={data} className="tabelTotal" />
      <div className="buttonWrapper">
        <Button type="primary" className="logout" onClick={handleLogout}>
          Deconectare
        </Button>
      </div>
    </div>
  );
  

};

export default ProductsTable;
