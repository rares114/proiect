import { Table } from "antd";
import React from "react";

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
];

const data = [
  {
    key: "1",
    name: "faina",
    quantity: 1,
    um: "kg",
  },
  {
    key: "2",
    name: "lapte",
    quantity: 0.5,
    um: "l",
  },
  {
    key: "3",
    name: "Bere",
    quantity: 0.33,
    um: "l",
  },
  {
    key: "4",
    name: "Cartofi",
    quantity: 1,
    um: "kg",
  },
  {
    key: "5",
    name: "Zahar",
    quantity: 1,
    um: "kg",
  },
  {
    key: "6",
    name: "Suc",
    quantity: 2.5,
    um: "l",
  },
];

const ProductsTable = () => {
  return <Table columns={columns} dataSource={data}></Table>;
};

export default ProductsTable;
