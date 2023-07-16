import React from 'react';

const Produsul = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return <div>No product selected.</div>;
  }

  const { name, quantity, um, price, shop_name } = selectedProduct;

  return (
    <div className='container-detalii-produs'>
      <p>Nume produs: {name}</p>
      <p>Cantitate: {quantity} {um}</p>
      <p>Pret: {price} LEI</p>
      <p>Magazin: {shop_name}</p>
    </div>
  );
};

export default Produsul;
