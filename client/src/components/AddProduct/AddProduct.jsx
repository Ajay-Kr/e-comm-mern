import React, { useState } from 'react';

import './addProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if(!name || !price || !company || ! category) {
      setError(true);
      return false;
    }

    // console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const addProductUrl = 'http://localhost:8000/product/add'
    const fetchedData  = await fetch(addProductUrl, {
      method: 'post',
      body: JSON.stringify({name, price, category, company, userId}),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    const result = await fetchedData.json();

    alert(`${result.name} added to the list`);
    navigate('/');
    
  }

  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type="text" placeholder='Enter product name'
        value={name} onChange={(e) => setName(e.target.value)}
        className='input-box'
      />
      { error && !name && 
          <span className='invalid-input'>Enter valid name</span>
      }

      <input type="text" placeholder='Enter product price' 
        value={price} onChange={(e) => setPrice(e.target.value)}
        className='input-box'
      />
      { error && !price && 
          <span className='invalid-input'>Enter valid price</span>
      }

      <input type="text" placeholder='Enter product category' 
        value={category} onChange={(e) => setCategory(e.target.value)}
        className='input-box'
      />
      { error && !category && 
          <span className='invalid-input'>Enter valid category</span>
      }

      <input type="text" placeholder='Enter product company' 
        value={company} onChange={(e) => setCompany(e.target.value)}
        className='input-box'
      />
      { error && !company && 
          <span className='invalid-input'>Enter valid company</span>
      }

      <button className='add-button' onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;