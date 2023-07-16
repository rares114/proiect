import React, { useState } from "react";
import { Button, Drawer } from "antd";
import ProductsTable from "../products/ProductsTable";
import ProductForm from "../products/ProductForm";
import DeleteProductForm from "../DeleteProductForm";

const TabProduseleMele = () => {
  const [addProductDrawerOpen, setAddProductDrawerOpen] = useState(false);
  const [deleteProductDrawerOpen, setDeleteProductDrawerOpen] = useState(false);

  const showAddProductDrawer = () => {
    setAddProductDrawerOpen(true);
  };

  const showDeleteProductDrawer = () => {
    setDeleteProductDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setAddProductDrawerOpen(false);
    setDeleteProductDrawerOpen(false);
  };

  return (
    <div className="tabelProd">
      <Button type="primary" htmlType="submit" className="nav-btn" onClick={showAddProductDrawer}>
        Adaugă un produs
      </Button>
      <Button type="primary" htmlType="submit" className="nav-btn" onClick={showDeleteProductDrawer}>
        Sterge un produs
      </Button>
      <ProductsTable />
      <Drawer
        title="Adăugare produs"
        placement="right"
        onClose={handleCloseDrawer}
        visible={addProductDrawerOpen}
      >
        <ProductForm />
      </Drawer>
      <Drawer
        title="Ștergere produs"
        placement="right"
        onClose={handleCloseDrawer}
        visible={deleteProductDrawerOpen}
      >
        <DeleteProductForm/>
      </Drawer>
    </div>
  );
};

export default TabProduseleMele;
