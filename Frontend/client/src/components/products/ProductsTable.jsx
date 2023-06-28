import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../../config";

const ProductsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server_url}/shops/shopproducts`, {
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

  return <Table columns={columns} dataSource={data} />;
};

export default ProductsTable;
