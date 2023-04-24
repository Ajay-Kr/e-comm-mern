import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateComponent/PrivateRoute';
import Login from './components/Login/Login';
import AddProduct from './components/AddProduct/AddProduct';
import ProductList from './components/ProductList/ProductList';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateRoute />} >
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={ <AddProduct /> } />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
