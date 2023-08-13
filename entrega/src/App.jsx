
import './App.css'
import { Header } from './componentes/Header/Header'
import ItemListConteiner from './componentes/ItemListConteiner/itemListConteiner'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ItemDetailConteiner from './componentes/ItemDetailContainer/ItemDetailConteiner';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import CartView from './componentes/CartView/CartView';

import Check from './componentes/check/check';


function App() {


  return (
    <CartProvider>
      <BrowserRouter>

        <div>
          <Header />

          <Routes>
            <Route path="/" element={<ItemListConteiner />} />
            <Route path="/productos/:categoryId" element={<ItemListConteiner />} />
            <Route path = "/cart" element = {< CartView/>}/>
            <Route path = "/checkout" element = {<Check />}/>
            <Route path="/detail/:itemId" element={< ItemDetailConteiner />} />
            <Route path="*" element={<h2>Pagina no encontrada</h2>} />
          </Routes>

          {/* {<Footer/>} */}
          {/* 
<Button variant="warning">Click me</Button>

<button className="btn btn-primary mx-4">Click me</button>
<button className="btn btn-success">Click me</button> */}

          {/* <img src="/public/logo.png" alt="El logo" /> */}

        </div>


      </BrowserRouter>

    </CartProvider>



  )
}

export default App
