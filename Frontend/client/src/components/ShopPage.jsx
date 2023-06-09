import React from "react";
import { Tabs } from "antd";
import TabInformatiileMele from "./tabs/TabInformatiilemele";
import TabProduseleMele from "./tabs/TabProduseleMele";

const tabs = [
  {
    key: "1",
    label: `Informatiile mele`,
    children: <TabInformatiileMele />,
  },
  {
    key: "2",
    label: `Produsele mele`,
    children: <TabProduseleMele />,
  },
];

const ShopPage = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      items={tabs}
      onChange={onChange}
      className="tabz"
    />
  );
};

export default ShopPage;
