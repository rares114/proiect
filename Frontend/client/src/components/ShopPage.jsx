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
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];

const ShopPage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />;
};

export default ShopPage;
