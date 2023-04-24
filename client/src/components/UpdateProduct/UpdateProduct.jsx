import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    // console.log(params);
    const getSingleProductUrl = `http://localhost:8000/product/${params.id}`;
    const fetchedData = await fetch(getSingleProductUrl, {
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
    const singleProduct = await fetchedData.json();

    setName(singleProduct.name);
    setPrice(singleProduct.price);
    setCategory(singleProduct.category);
    setCompany(singleProduct.company);
  }

  const updateProduct = async () => {
    // console.log('Update');
    const updateUrl = `http://localhost:8000/product/update/${params.id}`
    // const resultData = await fetch(updateUrl, {
    await fetch(updateUrl, {
      method: 'put',
      body: JSON.stringify({name, price, category, company}),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    // const result = await resultData.json();

    navigate('/');
  }

  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input type="text" placeholder='Enter product name'
        value={name} onChange={(e) => setName(e.target.value)}
        className='input-box'
      />

      <input type="text" placeholder='Enter product price' 
        value={price} onChange={(e) => setPrice(e.target.value)}
        className='input-box'
      />

      <input type="text" placeholder='Enter product category' 
        value={category} onChange={(e) => setCategory(e.target.value)}
        className='input-box'
      />

      <input type="text" placeholder='Enter product company' 
        value={company} onChange={(e) => setCompany(e.target.value)}
        className='input-box'
      />

      <button className='add-button' onClick={() => updateProduct()}>Update Product</button>
    </div>
  );
}

export default UpdateProduct;