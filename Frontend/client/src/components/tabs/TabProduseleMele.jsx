import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Button, Drawer } from "antd";
import ProductsTable from "../products/ProductsTable";
import ProductForm from "../products/ProductForm";

const TabProduseleMele = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="tabelProd">
      <Button type="primary" htmlType="submit" className='nav-btn' onClick={showDrawer}>
            Adaugă un produs
          </Button>
      <ProductsTable />
      <Drawer
        title="Definire produs"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <ProductForm />
      </Drawer>
    </div>
  );
};

export default TabProduseleMele;
