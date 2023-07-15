import React from 'react';

const Produsul = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return <div>No product selected.</div>;
  }

  const { name, quantity, um, price, shop } = selectedProduct;

  return (
    <div className='container-detalii-produs'>
      <p>Nume produs: {name}</p>
      <p>Cantitate: {quantity} {um}</p>
      <p>Pret: {price} LEI</p>
      <p>Magazin: {shop}</p>
    </div>
  );
};

export default Produsul;
