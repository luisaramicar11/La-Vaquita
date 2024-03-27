import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Header} from "./components/Header.jsx"
import {GroupCard} from "./components/Group-Card.jsx";
import {Footer} from "./components/Footer.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/amigos" element="" />
          <Route path="/gastos" element="" />
          <Route path="/grupos" element="" />
        </Routes>
        <Footer/>
      </BrowserRouter>
  
    </>
  )
}

export default App
