import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const getProductUrl = 'http://localhost:8000/product/all'
    const fetchedData = await fetch(getProductUrl, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    const result = await fetchedData.json();
    setProducts(result);
  }
  
  const deleteProduct = async (id) => {
    const deleteUrl = `http://localhost:8000/product/delete/${id}`;
    const fetchedData = await fetch(deleteUrl, {
      method: 'delete',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    const result = await fetchedData.json();
    if(result) {
      alert('Product Deleted');
      getProducts();
    }
  }

  const updateProduct = (id) => {
    console.log(id)
  }

  const searchHandle = async (e) => {
    const key = e.target.value;
    if(key) {
      const searchUrl = `http://localhost:8000/product/search/${key}`
      const fetchedData = await fetch(searchUrl, {
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      const result = await fetchedData.json();
      if(result) setProducts(result);
      else console.log('No Data Found');
    }
    else getProducts();
  }

  return (
    <div className='product-list'>
      <h3>Product List</h3>

      <input type="text" placeholder='Search Product' className='input-box search-input-box'
        onChange={searchHandle}
      />
      
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Company</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            products.length > 0
            ? products.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.company}</td>
                    <td>
                      <button className='delete-button' onClick={() => deleteProduct(product._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                      </button>
                      <Link to={`/update/${product._id}`}>
                        <button className='update-button' onClick={() => updateProduct(product._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                          </svg>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            : <tr>
                <th colSpan={6}>
                  <h3>No product found</h3> 
                </th>
              </tr> 
          }
        </tbody>
      </table>

      
    </div>
  );
}

export default ProductList;